import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import loadData from './dataset';

loadData().then(function(data) {
  console.log("DONE")
});

console.log("BYE!");
