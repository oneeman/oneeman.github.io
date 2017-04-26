import React from 'react';
import ReactDOM from 'react-dom';
import loadData from './dataset';
import { PanelWithControls } from './clusters-panel.jsx';

loadData().then((data) => {
  const originalData = {
    geoJSON: data.mapGeoJSON,
    data: data.original,
    abbr: data.abbrOriginal,
    names: data.namesOriginal,
    mean: data.mean
  };

  ReactDOM.render(
    React.createElement(PanelWithControls, {data: originalData, k: 6}),
    document.getElementById("plants-original-cluster-panel")
  );

  const fixedData = {
    geoJSON: data.mapGeoJSON,
    data: data.fixed,
    abbr: data.abbrFixed,
    names: data.namesFixed,
    mean: data.mean
  };

  ReactDOM.render(
    React.createElement(PanelWithControls, {data: fixedData, k: 6}),
    document.getElementById("plants-fixed-cluster-panel")
  );
});
