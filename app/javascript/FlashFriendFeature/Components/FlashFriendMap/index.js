import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: {},
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

      this.setState({
        lat: lat,
        lng: lng
      })
    }

    if(prevProps.markers !== this.props.markers) {
      const { markers } = this.props
      this.mapMarkers(markers)
    }
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

  mapMarkers = (markers) => {
    const { map } = this.state
    const infoWindow = new window.google.maps.InfoWindow()
    const contentString = 'String'
    markers.map(data => {
      const lat = data.attributes.latitude
      const lng = data.attributes.longitude
      const marker = new window.google.maps.Marker(
        { position: { lat: lat, lng: lng },
          map: map,
          title: 'Title'
        }
      )
      marker.addListener('click', function() {
        infoWindow.setContent(contentString)
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
