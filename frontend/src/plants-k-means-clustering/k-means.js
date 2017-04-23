import _ from 'lodash';

function dist(a, b) {
  const sqDist =
    _.chain(_.range(a.length))
          .map(i => a[i] - b[i])
          .map(x => x * x)
          .sum()
          .value();
  return Math.sqrt(sqDist);
}

function argmin(arr) {
  return _.indexOf(_.min(arr));
}

export function initializeCenters(n, k) {
  const randomArray = (() => _.times(n, Math.random));
  return _.times(k, randomArray);
}

export function classify(rows, centers) {
  return rows.map((row) => {
    const distances = centers.map(c => dist(row, c));
    return argmin(distances);
  });
}

export function updateCenters(rows, k, classification) {
  let groupedPoints = _.times(k, () => []);
}
