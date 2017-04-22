import React from 'react';
import { Map, GeoJSON} from 'react-leaflet';

export default function ChoroplethMap(props) {
  const limits = {lat: [24, 64], long: [-170, -52]};
  const width = 400;
  const aspectRatio = 1.92;
  const parentProps = {style: {height: width / aspectRatio, width}};
  const mapProps = {
    maxBounds: [[limits.lat[0], limits.long[0]], [limits.lat[1], limits.long[1]]],
    zoom: 2,
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
  const geoJSONProps = {
    data: props.geoJSON,
    style: {
      color: "grey",
      weight: 1.5,
      opacity: 0.5,
      fill: false
    },
  };
  return (<div {...parentProps}>
    <Map {...mapProps}>
      <GeoJSON {...geoJSONProps} />
    </Map>
  </div>);
}
