import React from 'react';
import ReactDOM from 'react-dom';
import loadData from './dataset';
import ChoroplethMap from './choroplethmap.jsx';
import ClustersPanel from './clusters-panel.jsx';
import { initializeCenters, classify, updateCenters } from './k-means.js';

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
  const centers = initializeCenters(n, 4);
  ReactDOM.render(React.createElement(ClustersPanel, {data: originalData, centers}), document.getElementById("map-test"));
});
