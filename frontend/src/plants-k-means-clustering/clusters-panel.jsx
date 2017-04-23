import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ChoroplethMap from './choroplethmap.jsx';
import { step, initializeCenters } from './k-means.js';

export function ClustersPanel({data, centers}) {
  const maps = centers.map((center, i) => {
    const values = _.zipObject(data.names, center);
    return (<div className="col-lg-4 choropleth-container">
      <div className="choropleth-inner-container">
        <ChoroplethMap geoJSON={data.geoJSON} values={values} mean={data.mean} key={i} />
      </div>
    </div>);
  });
  return <div className="row">{maps}</div>;
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
    this.state = this.getInitialState();
    setInterval(() => {
      if (this.state.running) {
        this.step();
      }
    }, 2000);
  }

  getInitialState() {
    return {
      i: 0,
      centers: initializeCenters(this.n, this.props.k),
      running: false,
    };
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

  reset() {
    this.setState(this.getInitialState());
  }

  render() {
    return (
      <div>
        <button className="primary" onClick={() => { this.step(); }}>Step</button>
        <button className="primary" onClick={() => { this.startStop(); }}>
          { this.state.running ? "Stop" : "Start" }
        </button>
        <button className="default" onClick={() => { this.reset(); }}>
          Reset
        </button>
 <ClustersPanel data={this.data} centers={this.state.centers} />
      </div>
    );
  }
}

PanelWithControls.propTypes = {
  data: PropTypes.object.isRequired,
  k: PropTypes.number.isRequired
};
