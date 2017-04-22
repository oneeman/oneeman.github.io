import 'whatwg-fetch';
import _ from 'lodash';

export default function getDataset() {
  return fetch('/assets/plants-k-means-clustering/plants.data')
    .then(response => response.text())
    .then(parseDataset);
}

function parseDataset(text) {
  const lines = text.split("\n");
  return lines;
}
