import React, { Component, Fragment } from 'react';
import FlashFriendForm from './Components/FlashFriendForm'
import Map from './Components/FlashFriendMap'
import Swipeable from './Components/SwipeableTabs'

export default class extends Component {
  state = {
    currentLocation: {
      lat: 90,
      lng: 135
    }
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

  getLocalPins = (data) => {
    const  markers  = data.data
    this.setState({
      markers: markers
    })
  }

  pinMapLocation = (item) => {
    const { latitude, longitude } = item
    this.setState({ currentLocation: Object.assign({}, this.state.currentLocation, { lat: latitude, lng: longitude })})
  }

  render() {
    const { currentLocation, markers } = this.state
    const map =   '<Map coords={currentLocation} markers={markers}/>'
    return <Fragment>
      <Map coords={currentLocation} markers={markers}/>
      <FlashFriendForm coords={currentLocation} markerData={this.getLocalPins}/>
      <Swipeable pinData={markers} pinLocation={this.pinMapLocation}/>
    </Fragment>

  }
}
