import React from 'react';
import { DeviceLocation } from '../DeviceLocation';
import { places } from '../MapMarkers/MarkerList/list_test_data';

export class MapConfiguration extends React.Component {

  state = {
    currentLocation: {
      lat: 90.00000,
      lng: 135.0000,
    },
  };

  renderMap = () => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    loadScript('https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap');
    window.initMap = this.initMap;
  };

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng },
      zoom: 16,
    });

    let infoWindow = new window.google.maps.InfoWindow();
    const location = this.state.currentLocation;
    places.markers.map(data => {
      let contentString = `${data.name}`;

      let marker = new window.google.maps.Marker(
        { position: { lat: data.lat, lng: data.lng },
        map: map,
        title: data.name,
      });

      marker.addListener('click', function () {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      });
    });

    let current = new window.google.maps.Marker(
      {
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: 'Current Location',
        icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
      }
    );

    current.addListener('click', function () {
      infoWindow.setContent('Current Location');
      infoWindow.open(map, current);
    });
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          currentLocation: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        });
      });
    }

    this.renderMap();
  }

  componentDidUPdate(prevProps, prevState) {
    if (prevState.currentLocation !== this.state.currentLocation) {
      // TBD
    }
  }

  render() {
    return (
      <main>
        <div id='map'></div>
      </main>
    );
  }
}

function loadScript(url) {
  const index  = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default MapConfiguration;
