import React from 'react';
import MapConfiguration from '../MapConfiguration';
import CreatePinForm from 'Forms/CreatePin';
import FlashFriendList from '../Lists/FlashFriend/FriendList';

class MapContainer extends React.Component {
  state = {
    currentLocation: {
      lat: 90.00000,
      lng: 135.0000,
    },
    topicValue: 0,
    css: {
      isHidden: true,
      isHiddenTopic: 'toggle-display-none',
      class: 'toggle-display-none',
    },
    pins: [],
    pinLocation: false,
    flashFriends: [],
  };

  setConfig = () => {
    return '<MapConfiguration selectedTopic={this.state.topicValue}/>';
  };

  onInterestSelectedShowTopic = () => {
    this.setState({ css: Object.assign({}, this.state.css, { class: 'toggle' })});
  };

  onTopicSelectedShowButtons = () => {
    this.setState({ css: Object.assign({}, this.state.css, { isHiddenTopic: 'toggle' })});
  };

  onTopicSelectedShowPins = () => {
    console.log('pinned');
  };

  findLocalPins = (pins) => {
    this.setState({ pins: pins });
    this.setState({ flashFriends: pins });
  };

  setCurrentLocation = (lat, lng) => {
    this.setState({ currentLocation: Object.assign({}, this.state.currentLocation, { lat: lat, lng: lng })});
  };

  pinMyLocation = () => {
    this.setState({ pinLocation: true });
  };

  render() {
    return (
      <div>
      <MapConfiguration
        selectedTopic={this.state.topicValue}
        updateCoordinates={this.setCurrentLocation}
        pins={this.state.pins}
        pinned={this.state.pinLocation}
      />
        <CreatePinForm
          hiddenTopic={this.state.css.class}
          showTopic={this.onInterestSelectedShowTopic}
          hiddenPinLocation={this.state.css.isHiddenTopic}
          showButtons={this.onTopicSelectedShowButtons}
          localPins={this.findLocalPins}
          pinLocation={this.pinMyLocation}
        />
        <FlashFriendList list={this.state.flashFriends}
          userClicked={this.state.findLocalPinsClicked}
        />
      </div>
    );
  }
};

export default MapContainer;
