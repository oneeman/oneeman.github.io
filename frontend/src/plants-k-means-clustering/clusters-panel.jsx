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
    }, 100);
  }

  getInitialState() {
    return {
      i: 0,
      centers: initializeCenters(this.n, this.props.k),
      labels: undefined,
      running: false,
      converged: false
    };
  }

  step() {
    const results = step(this.data.data, this.state.centers, this.state.labels);
    const newState = _.clone(this.state);

    newState.i += 1;
    newState.centers = results.centers;
    newState.labels = results.labels;

    if (_.isEqual(this.state.labels, results.labels)) {
      newState.converged = true;
      newState.running = false;
    }

    this.setState(newState);
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
        <span>Conveged: { this.state.converged ? "YES" : "NO" }</span>
        <ClustersPanel data={this.data} centers={this.state.centers} />
      </div>
    );
  }
}

PanelWithControls.propTypes = {
  data: PropTypes.object.isRequired,
  k: PropTypes.number.isRequired
};
