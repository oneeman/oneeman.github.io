import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import getDataset from './dataset';

getDataset().then(function(dataset) {
  console.log("DONE")
});

console.log("BYE!");
