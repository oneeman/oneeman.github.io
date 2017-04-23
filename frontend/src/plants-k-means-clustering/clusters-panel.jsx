import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ChoroplethMap from './choroplethmap.jsx';
import { step, initializeCenters } from './k-means.js';

export function ClustersPanel({data, centers}) {
  const maps = centers.map((center, i) => {
    const values = _.zipObject(data.names, center);
    return <ChoroplethMap geoJSON={data.geoJSON} values={values} mean={data.mean} key={i} />;
  });
  return <div>{maps}</div>;
}

ClustersPanel.propTypes = {
  data: PropTypes.object.isRequired,
  centers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

export class PanelWithControls extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.n = props.data.data[0].length;
    this.state = {
      i: 0,
      centers: initializeCenters(this.n, props.k),
      running: false,
    };
    setInterval(() => {
      if (this.state.running) {
        this.step();
      }
    }, 2000);
  }

  step() {
    const newCenters = step(this.data.data, this.state.centers);
    this.setState({i: this.state.i + 1, centers: newCenters});
  }

  startStop() {
    const newState = _.clone(this.state);
    newState.running = !this.state.running;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.step(); }}>Step</button>
        <button onClick={() => { this.startStop(); }}>{ this.state.running ? "Stop" : "Start" }</button>
        <ClustersPanel data={this.data} centers={this.state.centers} />
      </div>
    );
  }
}

PanelWithControls.propTypes = {
  data: PropTypes.object.isRequired,
  k: PropTypes.number.isRequired
};
