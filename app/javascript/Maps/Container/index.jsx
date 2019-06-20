import React from 'react';
import MapConfiguration from '../MapConfiguration';
import CreatePinForm from 'Forms/CreatePin';
import FlashFriendList from '../Lists/FlashFriend/FriendList';
import SimpleTabs from '../Lists/FlashFriend/TabbedList';

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

  getLocalPins = () => {

  }

  render() {
    const pinsList = this.getLocalPins(), { pins } = this.state
    return (
      <div className='map-container'>
        <section className='flex-container'>
          <div className='flash-friend-map'>
            <MapConfiguration
              selectedTopic={this.state.topicValue}
              updateCoordinates={this.setCurrentLocation}
              pins={this.state.pins}
              pinned={this.state.pinLocation}
            />
          </div>
        </section>
        <div className='create-pin-form'>
        <CreatePinForm
          hiddenTopic={this.state.css.class}
          showTopic={this.onInterestSelectedShowTopic}
          hiddenPinLocation={this.state.css.isHiddenTopic}
          showButtons={this.onTopicSelectedShowButtons}
          localPins={this.findLocalPins}
          pinLocation={this.pinMyLocation}
        />
        </div>
        <div className='flash-friend-list'>
          <FlashFriendList list={this.state.flashFriends}
            userClicked={this.state.findLocalPinsClicked}
          />
        </div>
        <div className='swipe-friend-list'>
          <SimpleTabs/>
        </div>
      </div>
    );
  }
};

export default MapContainer;
