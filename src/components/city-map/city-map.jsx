import React, {PureComponent} from 'react';
import leaflet from 'leaflet';
import PropTypes from "prop-types";
import ReactResizeDetector from 'react-resize-detector';

const markerIcon = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [27, 39]
});

const activeMarkerIcon = leaflet.icon({
  iconUrl: `/img/active-pin.svg`,
  iconSize: [27, 39]
});

class CityMap extends PureComponent {
  render() {
    return <div id="map" style={{height: `100%`}}>
      <ReactResizeDetector handleHeight handleWidth onResize={this._handlerHeightResize.bind(this)}/>
    </div>;

  }

  componentDidMount() {
    const {city, places, activePlace} = this.props;

    this.map = leaflet.map(`map`, {
      zoomControl: false,
      marker: true
    });

    leaflet.tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
            contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        }
    ).addTo(this.map);

    this.markersLayer = leaflet.layerGroup().addTo(this.map);
    this._setMapCenter(city, activePlace);
    this._addPlacesToMarkersLayer(places, activePlace);
  }

  componentDidUpdate() {
    if (this.map && this.markersLayer) {
      const {city, places, activePlace} = this.props;
      this._setMapCenter(city, activePlace);
      this.markersLayer.clearLayers();
      this._addPlacesToMarkersLayer(places, activePlace);
    }
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
  }

  _addPlacesToMarkersLayer(places, activePlace) {
    for (const place of places) {
      const icon = (activePlace && activePlace.id === place.id) ?
        activeMarkerIcon : markerIcon;
      const location = [place.location.latitude, place.location.longitude];
      leaflet.marker(location, {icon}).addTo(this.markersLayer);
    }
  }

  _setMapCenter(city, activePlace) {
    const location = (activePlace || city).location;
    this.map.setView([location.latitude, location.longitude], location.zoom);
  }

  _handlerHeightResize() {
    this.map.invalidateSize();
  }
}

CityMap.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        })
      }).isRequired
  ).isRequired,
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    })
  }).isRequired,
  activePlace: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    })
  }),
};

export default CityMap;
