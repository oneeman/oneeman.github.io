import React from 'react';
import ReactDOM from 'react-dom';
import loadData from './dataset';
import { ClustersPanel, PanelWithControls } from './clusters-panel.jsx';
import { initializeCenters, step } from './k-means.js';

let data;

loadData().then((theData) => {
  data = theData;
  const originalData = {
    geoJSON: data.mapGeoJSON,
    data: data.original,
    abbr: data.abbrOriginal,
    names: data.namesOriginal,
    mean: data.mean
  };
  ReactDOM.render(
    React.createElement(PanelWithControls, {data: originalData, k: 4}),
    document.getElementById("map-test")
  );
});
