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
  let best = arr[0];
  let result = 0;
  arr.forEach((x, i) => {
    if (x < best) {
      best = x;
      result = i;
    }
  });
  return result;
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

export function updateCenters(rows, k, labels) {
  const m = rows.length;
  const n = rows[0].length;
  const groupedPoints = _.times(k, () => _.times(n, () => []));
  for (let i = 0; i < m; i++) {
    const row = rows[i];
    const label = labels[i];
    for (let j = 0; j < n; j++) {
      groupedPoints[label][j].push(row[j]);
    }
  }

  return groupedPoints.map((cluster) => {
    return cluster.map(_.mean);
  });
}

export function step(rows, centers) {
  const labels = classify(rows, centers);
  return updateCenters(rows, centers.length, labels);
}
