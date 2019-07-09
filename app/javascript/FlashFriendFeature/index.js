import React, { Component, Fragment } from 'react';
import FlashFriendForm from './Components/FlashFriendForm'
import Map from './Components/FlashFriendMap'
import Swipeable from './Components/SwipeableTabs'

export default class extends Component {
  state = {
    currentLocation: {
      lat: 40.372609,
      lng: -130.428589
    },
    pinId: 0
  }

  componentDidMount () {
    if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          currentLocation: {
            lat: location.coords.latitude,
            lng: location.coords.longitude
          }
        })
      })
  }

  setMarkerData = (data) => {
    const  markers  = data.data
    this.setState({
      markers
    })
  }

  handleCurrentLocationUpdate = (item) => {
    this.pinMapLocation(item)
  }

  handleSelectedPin = (lat, lng, id) => {
    const pinId = parseInt(id, 10)
    this.pinMapLocation({latitude: lat, longitude: lng})
    this.setState({ pinId: pinId })
  }

  pinMapLocation = (item) => {
    const { latitude, longitude } = item
    this.setState({ currentLocation: Object.assign({}, this.state.currentLocation, { lat: latitude, lng: longitude })})
  }

  resetPinId = (value) => {
    this.setState({ pinId: value })
  }

  render() {
    const { currentLocation, markers } = this.state
    const map =   '<Map coords={currentLocation} markers={markers}/>'
    return <Fragment>
      <Map coords={currentLocation} markers={markers} onClickedPin={this.handleSelectedPin}/>
      <FlashFriendForm coords={currentLocation} onFindLocalInterestClick={this.setMarkerData}/>
      <Swipeable pinData={markers}
                 getPinLocation={this.handleCurrentLocationUpdate}
                 onPinIdChange={this.resetPinId}
                 pinId={this.state.pinId}
      />
    </Fragment>

  }
}
