import React from 'react';
import ReactDOM from 'react-dom';
import loadData from './dataset';
import ClustersPanel from './clusters-panel.jsx';
import { initializeCenters, step } from './k-means.js';

let data;

loadData().then((theData) => {
  data = theData;
  const originalData = {
    geoJSON: data.mapGeoJSON,
    data: data.original,
    abbr: data.abbrOriginal,
    names: data.namesOriginal
  };
  const n = originalData.data[0].length;
  let centers = initializeCenters(n, 4);
  for (let i = 0; i < 2; i++) {
    centers = step(originalData.data, centers);
  }
  ReactDOM.render(
    React.createElement(ClustersPanel, {data: originalData, centers}),
    document.getElementById("map-test")
  );
});
