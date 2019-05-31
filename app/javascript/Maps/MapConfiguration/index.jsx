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
      // const center = { lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }
      // const map = this.state.map;
      // this.state.map.panTo(center);
      this.setState({ map: map });
    }
  }

  handleButtonClick = async(toggled) => {

    if (toggled.clickedButton == 'Find Local Pins') {
      let infoWindow = new window.google.maps.InfoWindow();
      const response = await pins.get('/pins');
      const responseData = response.data;
      this.setState({ flashFriends: responseData.data });
      responseData.data.map(data => {
        let contentString = 'Make Dynamic Content String';

        let marker = new window.google.maps.Marker(
          { position: { lat: data.attributes.latitude, lng: data.attributes.longitude },
          map: this.state.map,
          title: data.name,
        });

        marker.addListener('click', function () {
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });
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

    this.setState({ map: map });
  };


  render() {
    return (
      <main>
        <div id='map'></div>
        <Button onButtonClick={this.handleButtonClick} text={'Pin My Location'}/>
        <Button onButtonClick={this.handleButtonClick} text={'Find Local Pins'}/>
        <FlashFriendList list={this.state.flashFriends} />
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
