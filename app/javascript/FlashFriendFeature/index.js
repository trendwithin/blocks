import React, { Component, Fragment } from 'react';
import FlashFriendForm from './Components/FlashFriendForm'
import Map from './Components/FlashFriendMap'
import Swipeable from './Components/SwipeableTabs'
import axiosApi from './apis/FlashFriendEndPoint'

export default class extends Component {
  state = {
    currentLocation: {
      lat: 40.372609,
      lng: -130.428589
    },
    pinId: 0,
    markerMessage: [],
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
    if(data.data === undefined || data.data.length == 0) {
      this.setNoMatchesFound()
    }
    else {
      const  markers  = data.data
      this.setState({
        markers
      })
      this.setMarkerMessage(markers[0])
    }
  }

  setNoMatchesFound = () => {
    const markers = []
    this.setState({ markers })
  }

  setMarkerMessage = (marker) => {
    const { id } = marker
    this.fetchPinMessage(id)
  }

  handleCurrentLocationUpdate = (item) => {
    this.pinMapLocation(item)
  }

  handleSelectedPin = (lat, lng, id) => {
    const elemPos = this.state.markers.map((x)=> x.id).indexOf(id)
    const pinId = parseInt(id, 10)
    this.pinMapLocation({latitude: lat, longitude: lng})
    this.setState({ pinId: elemPos })
  }

  pinMapLocation = (item) => {
    const { latitude, longitude } = item
    this.setState({ currentLocation: Object.assign({}, this.state.currentLocation, { lat: latitude, lng: longitude })})
  }

  resetPinId = (value) => {
    this.setState({ pinId: value })
  }

  fetchPinMessage = async(id) => {
    const { data, status } = await axiosApi.get(`/pin_messages?pin=${id}`, { data: 'data' })
    if (status == 200)
      this.setState({
        markerMessage: data.data
      })
  }

  processUserMessage = (msg) => {
    const addMessage = [...this.state.markerMessage, msg]
  }

  render() {
    const { currentLocation, markers } = this.state
    const mapLink = "<Map coords={currentLocation} markers={markers} onClickedPin={this.handleSelectedPin}/>"
    const map =   '<Map coords={currentLocation} markers={markers}/>'
    return <Fragment>
      <Map coords={currentLocation} markers={markers} onClickedPin={this.handleSelectedPin}/>
      <FlashFriendForm coords={currentLocation} onFindLocalInterestClick={this.setMarkerData}/>
      <Swipeable pinData={markers}
                 getPinLocation={this.handleCurrentLocationUpdate}
                 onPinIdChange={this.resetPinId}
                 pinId={this.state.pinId}
                 pinMessage={this.pinMessage}
                 markerMessage={this.state.markerMessage}
                 getUserMessage={this.processUserMessage}
      />
    </Fragment>

  }
}
