import React from 'react';
import { DeviceLocation } from '../DeviceLocation';
import Button from '../Buttons/FlashFriendButton';
import FlashFriendList from '../Lists/FlashFriend/FriendList';
import pins from '../apis/FlashFriendEndPoint';

export class MapConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      pins: [],
      currentLocation: {
        lat: 90,
        lng: 135,
      },
      flashFriends: [],
    };
  }

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentLocation !== this.state.currentLocation) {
      const lat = this.state.currentLocation.lat;
      const lng = this.state.currentLocation.lng;
      this.props.updateCoordinates(lat, lng);
    }

    if (prevState.pins !== this.state.pins) {
      this.mapMarkers(this.state.pins);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ pins: nextProps.pins });

    if (nextProps.pinned) {
      this.pinMapLocation();
    }
  }

  pinMapLocation = () => {
    const userId = document.getElementById('logout-link').getAttribute('data-user');
    const lat = this.state.currentLocation.lat;
    const lng = this.state.currentLocation.lng;
    const topicId = this.props.selectedTopic;
    pins.post('/pins', {
      user_id: userId,
      latitude: lat,
      longitude: lng,
      topic_id: 1,
    })
    .then(response => {
      if (response.status == 201) {
        let marker = new window.google.maps.Marker(
          { position: { lat: lat, lng: lng },
            map: this.state.map,
            title: 'Current Location',
          });
        marker.addListener('click', function () {
          infoWindow.setContent('Current Location');
          infoWindow.open(map, marker);
        });
      }
    });
  };

  mapMarkers = (markers) => {
    if (markers.length !== 0) {
      let infoWindow = new window.google.maps.InfoWindow();
      let contentString = 'String';
      markers.map(data => {
        const lat = data.attributes.latitude;
        const lng = data.attributes.longitude;
        let marker = new window.google.maps.Marker(
          { position: { lat: lat, lng: lng },
          map: this.state.map,
          title: 'Title',
        }
      );
        marker.addListener('click', function () {
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });
      });
    }
  };

  renderMap = () => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
    window.initMap = this.initMap;
  };

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng },
      zoom: 16,
    });
    window.google.maps.event.trigger(map, 'resize');
    this.setState({ map: map });
    this.resizeMap(map);
  };

  resizeMap = (map) => {
    window.google.maps.event.trigger(map, 'resize');
  };

  render() {
    return (
      <main>
        <div id='map-responsive'>
          <div id='map'></div>
        </div>
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
