import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ChoroplethMap from './choroplethmap.jsx';
import { step, initializeCenters } from './k-means.js';

export function ClustersPanel({data, centers}) {
  const maps = centers.map((center, i) => {
    const values = _.zipObject(data.names, center);
    return (<div className="col-lg-4 choropleth-container" key={i}>
      <div className="choropleth-inner-container">
        <ChoroplethMap geoJSON={data.geoJSON} values={values} mean={data.mean} />
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
    this.state = this.getInitialState(this.props.k);
    this.interval = setInterval(() => {
      if (this.state.running) {
        this.step();
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getInitialState(k) {
    if (k === undefined) {
      return {
        k: undefined,
        kCandidate: _.get(this, 'state.k', 6),
        running: false
      };
    }

    return {
      k,
      i: 0,
      centers: initializeCenters(this.n, k),
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
    this.setState(this.getInitialState(this.state.k));
  }

  changeK() {
    this.setState(this.getInitialState());
  }

  setKCandidate(kCandidate) {
    this.setState({k: undefined, running: false, kCandidate});
  }

  selectK() {
    this.setState(this.getInitialState(this.state.kCandidate));
  }

  renderKSelector() {
    return (<div className="clusters-panel">
      <div className="k-selection">
        <div>How many clusters should we use?</div>
        <div>
          <input type="range" name="numClusters" min="2" max="15" step="1"
                value={this.state.kCandidate}
                onChange={(ev) => { this.setKCandidate(ev.target.value); }} />
          <span className="k-candidate-number">{this.state.kCandidate}</span>
          <button className="primary" onClick={() => { this.selectK(); }}>Select</button>
        </div>
      </div>
    </div>);
  }

  renderPanels() {
    return (
      <div className="clusters-panel">
        <div className="controls">
          <button className="primary"
                  disabled={this.state.converged}
                  onClick={() => { this.startStop(); }}>
            { this.state.running ? "Stop" : "Run" }
          </button>
          <button className="primary"
                  disabled={this.state.running || this.state.converged}
                  onClick={() => { this.step(); }}>Run a single step
          </button>
          <button className="warn" onClick={() => { this.reset(); }}>
            Reset
          </button>
          <button className="default" onClick={() => { this.changeK(); }}>
            Change number of clusters
          </button>
          <div className="k-means-status">
            <div>Iterations completed: {this.state.i} { this.state.converged ? "(reached convergence)" : "" }</div>
          </div>
        </div>
        <ClustersPanel data={this.data} centers={this.state.centers} />
      </div>
    );
  }

  render() {
    return this.state.k === undefined ? this.renderKSelector() : this.renderPanels();
  }
}

PanelWithControls.propTypes = {
  data: PropTypes.object.isRequired,
  k: PropTypes.number
};
