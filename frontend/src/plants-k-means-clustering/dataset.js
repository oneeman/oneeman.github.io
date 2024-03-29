import 'whatwg-fetch';
import _ from 'lodash';

const data = {};

function doReproject(mapGeoJSON) {
  mapGeoJSON.crs = {
    type: "name",
    properties: {
      name: "miller",
    }
  };
  return mapGeoJSON;
}

export default function loadData() {
  return Promise.all([fetchDataset(), fetchMap(), fetchAbbreviations()]).then(([datasetLines, mapGeoJSON]) => {
    data.original = encodeDataset(datasetLines, data.abbrOriginal);
    data.fixed = encodeDataset(datasetLines, data.abbrFixed);
    data.mapGeoJSON = doReproject(mapGeoJSON);
    data.mean = _.mean(data.original.map(row => _.mean(row)));
    return data;
  });
}

function fetchAbbreviations() {
  return fetch('/assets/plants-k-means-clustering/stateabbr.txt')
    .then(response => response.text())
    .then((text) => {
      const lines = text.split("\n").filter(x => x.length > 0);
      const pairs = lines.map((line) => {
        const split = line.indexOf(" ");
        return [line.slice(0, split), line.slice(split + 1)];
      });
      return _.fromPairs(pairs);
    })
    .then((abbr) => {
      data.abbrOriginal = abbr;
      // For abbrFixed, fix Alabama and Albert being flipped
      data.abbrFixed = _.clone(abbr);
      data.abbrFixed.ab = abbr.al;
      data.abbrFixed.al = abbr.ab;
      data.namesOriginal = getStateNames(data.abbrOriginal);
      data.namesFixed = getStateNames(data.abbrFixed);
    });
}

function fetchDataset() {
  return fetch('/assets/plants-k-means-clustering/plants.data')
    .then(response => response.text())
    .then(parseDataset);
}

function fetchMap() {
  return fetch('/assets/plants-k-means-clustering/states.geojson')
    .then(response => response.json());
}

function parseDataset(text) {
  const lines = _.filter(text.split("\n"));
  return lines.map(line => line.split(",").slice(1));
}

function encodeDataset(datasetLines, abbr) {
  const states = _.keys(abbr);
  states.sort();
  return datasetLines.map((line) => {
    return states.map(state => (line.includes(state) ? 1 : 0));
  });
}

function getStateNames(abbr) {
  const pairs = _.toPairs(abbr);
  pairs.sort();
  return pairs.map(p => p[1]);
}
