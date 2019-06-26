import React, { Component, Fragment } from 'react';
import FlashFriendForm from './Components/FlashFriendForm'
import Map from './Components/FlashFriendMap'
import Tabs from './Components/Tabs'
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

  render() {
    const { currentLocation, markers } = this.state
    return <Fragment>
      <Map coords={currentLocation} markers={markers}/>
      <FlashFriendForm coords={currentLocation} markerData={this.getLocalPins}/>
      <Swipeable pinData={markers} />
    </Fragment>

  }
}
