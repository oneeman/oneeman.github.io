import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Proj } from 'leaflet';
import { Map, GeoJSON } from 'react-leaflet';
import proj4 from 'proj4';
import 'proj4leaflet';
import chroma from 'chroma-js';

proj4.defs("miller", "+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +ellps=WGS84 +datum=WGS84 +units=m no_defs");

export default function ChoroplethMap(props) {
  const palette = chroma.scale(['red', 'white', 'green']).domain([0, props.mean, 1]);
  const center = {x: -0.001002, y: 0.00049};
  const parentProps = {style: {height: 172, width: 338}};
  const mapProps = {
    zoom: 19,
    center: [center.y, center.x],
    // Disable all interactivity
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    tap: false,
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
      fillColor: getColor(props.values, name, palette)
    };
  };

  return (<div className="plants-choropleth-map" {...parentProps}>
    <Map id={props.id} {...mapProps}>
      <Proj4GeoJSON style={featureStyle} data={props.geoJSON} />
    </Map>
  </div>);
}

ChoroplethMap.propTypes = {
  geoJSON: PropTypes.object.isRequired,
  mean: PropTypes.number.isRequired,
  values: PropTypes.objectOf(PropTypes.number)
};

ChoroplethMap.defaultProps = {
  values: {},
  mean: 0.5
};

function getColor(values, name, palette) {
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

class Proj4GeoJSON extends GeoJSON {
  createLeafletElement(props) {
    const options = _.clone(props);
    const data = props.data;
    delete options.data;
    return Proj.geoJson(data, this.getOptions(options));
  }
}
