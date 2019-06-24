import React, { Component, Fragment } from 'react';
import FlashFriendForm from './Components/FlashFriendForm'

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

  render() {
    const { currentLocation } = this.state
    return <Fragment>
      <FlashFriendForm coords={currentLocation}/>
    </Fragment>

  }
}
