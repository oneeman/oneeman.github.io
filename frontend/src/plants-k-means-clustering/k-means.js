import _ from 'lodash';

function dist(a, b) {
  let ssq = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = b[i] - a[i];
    ssq += diff * diff;
  }
  return Math.sqrt(ssq);
}

export function initializeCenters(n, k) {
  const randomArray = (() => _.times(n, Math.random));
  return _.times(k, randomArray);
}

export function classify(rows, centers) {
  const labels = [];
  for (let i = 0; i < rows.length; i++) {
    const x = rows[i];
    let label = 0;
    let best = dist(x, centers[0]);
    for (let k = 1; k < centers.length; k++) {
      const distance = dist(x, centers[k]);
      if (distance < best) {
        label = k;
        best = distance;
      }
    }
    labels.push(label);
  }
  return labels;
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

export function step(rows, centers, labels) {
  // If we are given the labels from the last step, we don't need to recalculate them
  labels = labels || classify(rows, centers);
  const newCenters = updateCenters(rows, centers.length, labels);
  const newLabels = classify(rows, newCenters);
  return {
    centers: newCenters,
    labels: newLabels
  };
}
