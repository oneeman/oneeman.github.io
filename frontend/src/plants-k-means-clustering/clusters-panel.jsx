import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ChoroplethMap from './choroplethmap.jsx';

export default function ClustersPanel({data, centers}) {
  const maps = centers.map((center, i) => {
    const values = _.zipObject(data.names, center);
    return <ChoroplethMap geoJSON={data.geoJSON} values={values} key={i} />;
  });
  return <div>{maps}</div>;
}

ClustersPanel.propTypes = {
  data: PropTypes.object.isRequired,
  centers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};
