import React from 'react';
import interests from '../apis/VersionOne';

class CreatePinForm extends React.Component {
  state = {
    interests: [],
    topics: [],
    value: '',
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
      <div>
      <div className='field'>
        <label htmlFor='pin_interest_id'>Interest</label>
        <select name="pin[interst_id]" id="pin_interest_id" onChange={this.onSelectChange} value={this.state.value}>
          <option value></option>
          {this.state.interests.map((item) => <option key={item.value} value={item.display}>{item.display}</option>)}
        </select>
      </div>
      <div className='field' className={this.state.toggleTopic}>
        <label htmlFor='pin_topic_id'>Topic</label>
        <select name="pin[topic_id]" id="pin_topic_id">
          <option value></option>
          {this.state.topics.map((item) => <option key={item.value} value={item.display}>{item.display}</option>)}

        </select>
      </div>
      </div>
    );
  }
};

export default CreatePinForm;
