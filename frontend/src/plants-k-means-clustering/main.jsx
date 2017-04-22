import React from 'react';
import ReactDOM from 'react-dom';
import loadData from './dataset';
import ChoroplethMap from './choroplethmap.jsx';

let data;

loadData().then((theData) => {
  data = theData;
  ReactDOM.render(React.createElement(ChoroplethMap, {geoJSON: data.mapGeoJSON}), document.getElementById("map-test"));
});
