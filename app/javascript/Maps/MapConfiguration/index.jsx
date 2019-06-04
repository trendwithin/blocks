import React from 'react';
import { DeviceLocation } from '../DeviceLocation';
import Button from '../Buttons/FlashFriendButton';
import FlashFriendList from '../Lists/FlashFriend/FriendList';
import pins from '../apis/FlashFriendEndPoint';

export class MapConfiguration extends React.Component {

  state = {
    map: {},
    currentLocation: {
      lat: 90.00000,
      lng: 135.0000,
    },
    flashFriends: [],
    findLocalPinsClicked: false,
    isHidden: false,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentLocation !== this.state.currentLocation) {
      // for some unknown reason map unlikely to recenter w/o
    }
  }

  handleButtonClick = async(toggled) => {

    if (toggled.clickedButton == 'Find Local Pins') {
      await pins.get('/pins', { data: 'data' })
      .then(response => {
        const userClicked = this.state.findLocalPinsClicked = !this.state.findLocalPinsClicked;
        this.setState(
          { flashFriends: response.data.data,
            findLocalPinsClicked: userClicked,
          }
        );
        this.mapMarkers(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
    }

    if (toggled.clickedButton === 'Pin My Location') {
      const lat = this.state.currentLocation.lat;
      const lng = this.state.currentLocation.lng;
      let infoWindow = new window.google.maps.InfoWindow();
      if (toggled.clickedButton === 'Pin My Location') {
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

      this.setState({ isHidden: true });
    }
  };

  mapMarkers = (markers) => {
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

    this.setState({ map: map });
  };

  render() {
    return (
      <main>
        <div id='map'></div>
        { !this.state.isHidden &&
          <Button onButtonClick={this.handleButtonClick} text={'Pin My Location'}/>
        }
        <Button onButtonClick={this.handleButtonClick} text={'Find Local Pins'}/>
        <FlashFriendList list={this.state.flashFriends}
          userClicked={this.state.findLocalPinsClicked}
        />
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
