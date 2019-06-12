import React from 'react';
import MapConfiguration from '../MapConfiguration';
import CreatePinForm from 'Forms/CreatePin';

class MapContainer extends React.Component {
  state = {
    interestTopicToggled: false,
    topicValue: '',
  }

  onInterestTopicToggled = () => {
    this.setState({ interestTopicToggled: true });
  };

  setTopicValue = (topic) => {
    console.log(topic);
    this.setState({ topicValue: topic });
  };

  render() {
    return (
      <div>
        <MapConfiguration />
        <CreatePinForm toggled={this.onInterestTopicToggled} topic={this.setTopicValue} />
      </div>
    );
  }
};

export default MapContainer;
