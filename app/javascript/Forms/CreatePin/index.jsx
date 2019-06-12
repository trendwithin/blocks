import React from 'react';
import interests from '../apis/VersionOne';

class CreatePinForm extends React.Component {

  state = {
    interests: [],
    topics: [],
    value: '',
    topicValue: '',
    toggleTopic: 'toggle-topic-field',
  };

  onSelectChange = (event) => {
    this.setState({ value: event.target.value });
    this.setState({ toggleTopic: 'toggled-topic-field-visible' });
    interests.get(`topics/interest_topics?interest=${event.target.value}`)
      .then(response => {
        let dataFromApi = response.data.data.map
          (topic => { return { value: topic.id, display: topic.attributes.subject }; });
        this.setState({ topics: dataFromApi });
      });
  };

  onTopicChange = (event) => {
    // this.props.topics(topic);
    this.setState({ topicValue: event.target.value });
    this.props.topic(event.target.value);
  };

  componentDidMount() {
    interests.get('/interests', { data: 'data' })
      .then(response => {
        let dataFromApi = response.data.data.map
          (interest => { return { value: interest.id, display: interest.attributes.curiosity }; });
        this.setState({ interests: dataFromApi });
      });
  };

  render() {
    return (
      <div className='flex flex-row flex-wrap'>
        <div className='field flex flex-column w-50'>
          <label htmlFor='pin_interest_id'>Interest</label>
          <select name="pin[interst_id]" id="pin_interest_id" onChange={this.onSelectChange} value={this.state.value}>
            <option value>Choose an Interest</option>
            {this.state.interests.map((item) => <option key={item.value} value={item.display}>{item.display}</option>)}
          </select>
        </div>
        <div className='w-50'>
          <div className={this.state.toggleTopic}>
            <div className='field flex flex-column'>
              <label htmlFor='pin_topic_id'>Topic</label>
              <select name="pin[topic_id]" id="pin_topic_id" onChange={this.onTopicChange} value={this.state.topicValue}>
                <option value>Choose a Topic</option>
                {this.state.topics.map((item) => <option key={item.value} value={item.display}>{item.display}</option>)}

              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CreatePinForm;
