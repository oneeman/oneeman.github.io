import React from 'react';
import PropTypes from 'prop-types';
import { Map, GeoJSON } from 'react-leaflet';
import chroma from 'chroma-js';

const palette = chroma.scale('RdBu').padding(-0.2);

export default function ChoroplethMap(props) {
  const limits = {lat: [26, 68], long: [-170, -52]};
  const width = 500;
  const aspectRatio = 1.82;
  const parentProps = {style: {height: width / aspectRatio, width}};
  const mapProps = {
    maxBounds: [[limits.lat[0], limits.long[0]], [limits.lat[1], limits.long[1]]],
    zoom: 3,
    center: [(limits.lat[0] + limits.lat[1]) / 2, (limits.long[0] + limits.long[1]) / 2],
    // Disable all interactivity
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    zoomControl: false,
    attributionControl: false,
    zoomAnimation: false
  };

  const featureStyle = (feature) => {
    const name = feature.properties.woe_name;
    return {
      color: "grey",
      weight: 1.5,
      opacity: 1,
      fillColor: getColor(props.values, name)
    };
  };

  return (<div {...parentProps}>
    <Map id={props.id} {...mapProps}>
      <GeoJSON style={featureStyle} data={props.geoJSON} />
    </Map>
  </div>);
}

ChoroplethMap.propTypes = {
  geoJSON: PropTypes.object.isRequired,
  values: PropTypes.objectOf(PropTypes.number)
};

ChoroplethMap.defaultProps = {
  values: {}
};

function getColor(values, name) {
  if (name == null) {
    return null;
  }
  let val;
  if (name === "Newfoundland and Labrador") {
    // Average the two, since on the map they're lumped together
    val = (values.Newfoundland + values.Labrador) / 2;
  } else {
    val = values[name];
  }
  return palette(val);
}
