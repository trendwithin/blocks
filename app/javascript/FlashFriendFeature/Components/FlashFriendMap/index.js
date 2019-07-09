import React, { Component } from 'react';
import { render } from 'react-dom';
import InfoWindow from './InfoWindow'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: {},
      toggledInfoWindow: false,
    }
  }

  componentDidMount() {
    const { coords } = this.props
    this.setState({
      lat: coords.lat,
      lng: coords.lng,
    })

    this.renderMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const { coords } = this.props
      const { lat, lng } = coords
      const { map } = this.state
      this.setState({
        lat: lat,
        lng: lng
      })

      if(prevState.map !== this.state.map) {
        map.setCenter( new google.maps.LatLng(lat, lng))
      }
    }

    if(prevProps.coords !== this.props.coords) {
      const { lat, lng } = this.props.coords
      const { map } = this.state
      if (!this.isEmpty(map)) {
       map.setCenter( {lat: lat, lng: lng} )
     }
    }

    if(prevProps.markers !== this.props.markers) {
      const { markers } = this.props
      this.mapMarkers(markers)
    }
  }

  isEmpty = (obj) => {
    for ( let prop in obj ) {
      return false
    }
    return true
  }

  renderMap = () => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
    window.initMap = this.initMap;
  }


  initMap = () => {
    const { lat, lng } = this.state
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: lat, lng: lng },
      zoom: 16,
    })

    this.setState({ map: map })
    this.resizeMap(map)
  }

  resizeMap = (map) => {
    window.google.maps.event.trigger(map, 'resize')
  }


  onMarkerClick = (lat, lng, id) => {
    this.props.onClickedPin(lat, lng, id)
  }

  addRenderToInfoWindow = (infoWindow, lat) => {
    infoWindow.addListener('domready', e => {
      render(<InfoWindow content={lat}/>, document.getElementById('infoWindow'))
    })
  }


  mapMarkers = (markers) => {
    const { map } = this.state
    const infoWindow = new window.google.maps.InfoWindow()
    const content = '<div id="infoWindow" />'

    markers.map(data => {
      const id = data.id
      const lat = data.attributes.latitude
      const lng = data.attributes.longitude
      const marker = new window.google.maps.Marker(
        { position: { lat: lat, lng: lng },
          map: map,
          title: 'Title'
        }
      )

      marker.addListener('click', (e) => {
        this.onMarkerClick(lat, lng, id)
        infoWindow.setContent(content)
        this.addRenderToInfoWindow(infoWindow, lat)
        infoWindow.open(map, marker)
      })
    })

    this.resizeMap(map)
  }

  render() {
    return (
      <main>
        <div id='map-responsive'>
          <div id='map'></div>
        </div>
      </main>
    )
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
