import React, {PureComponent} from "react";
import Leaflet from "leaflet";
import PropTypes from "prop-types";
import Constants from "../../constants";

const MapConfig = {
  ZOOM: 12,
  ICON_URL: `/img/pin.svg`,
  ACTIVE_ICON_URL: `/img/pin-active.svg`,
  ICON_SIZE: [30, 30],
  TILE_LAYER: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  TILE_ATTRIBUTE: `&copy; <a href="htps://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
  MAIN_CITY: [52.38333, 4.9]
};

const icon = Leaflet.icon({
  iconUrl: MapConfig.ICON_URL,
  iconSize: MapConfig.ICON_SIZE
});

const activeIcon = Leaflet.icon({
  iconUrl: MapConfig.ACTIVE_ICON_URL,
  iconSize: MapConfig.ICON_SIZE
});

const setMapView = (map, currentCity, zoom) => {
  map.setView(Constants.CITIES_COORDINATES.get(currentCity), zoom);
};

const renderMarkers = (leaflet, coordinates, markerGroup, activeOffer) => {
  coordinates.forEach((coordinate) => {
    leaflet
      .marker(coordinate, {icon})
      .addTo(markerGroup);
  });

  if (activeOffer) {
    leaflet.marker(activeOffer.location.coordinates, {icon: activeIcon}).addTo(markerGroup);
  }
};

const createMap = (leaflet, mapConfig) => {
  return leaflet.map(`map`, {
    center: mapConfig.MAIN_CITY,
    zoom: mapConfig.ZOOM,
    zoomControl: false,
    marker: true
  });
};

class Map extends PureComponent {
  componentDidMount() {
    this._initMap(MapConfig, this.props.currentCity, this.props.coordinates);
  }

  componentDidUpdate() {
    this._markerGroup.clearLayers();
    setMapView(this._map, this.props.currentCity, MapConfig.ZOOM);
    renderMarkers(Leaflet, this.props.coordinates, this._markerGroup, this.props.activeOffer);
  }

  _initMap(mapConfig, currentCity, coordinates) {
    this._map = createMap(Leaflet, MapConfig);

    Leaflet
      .tileLayer(mapConfig.TILE_LAYER, {
        attribution: mapConfig.TILE_ATTRIBUTE
      })
      .addTo(this._map);

    setMapView(this._map, currentCity, mapConfig.ZOOM);
    this._markerGroup = Leaflet.layerGroup().addTo(this._map);
    renderMarkers(Leaflet, coordinates, this._markerGroup, this.props.activeOffer);
  }

  render() {
    return <div id="map" style={{height: `100%`}}/>;
  }
}

Map.propTypes = {
  activeOffer: PropTypes.object,
  coordinates: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
};

export default Map;
