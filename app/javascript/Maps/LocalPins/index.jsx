import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class MappedLocalPins extends React.Component {

  render () {
    const mapStyles = {
      width: '100%',
      height: '100%',
    };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233,
        }}
      />
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MappedLocalPins);
