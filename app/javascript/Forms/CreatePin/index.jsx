import React from 'react';
import FormOptions from './Options';
import interests from '../apis/VersionOne';

class CreatePinForm extends React.Component {
  state = {
    interests: [],
    options: [],
    value: '',
    toggleTopic: 'toggle-topic-field'
  };

  onSelectChange = (event) => {
    this.setState({ value: event.target.value });
    this.setState({ toggleTopic: 'toggled-topic-field-visible' });
    console.log('Changed');
    console.log(event.target.value);
  }

  componentDidMount() {
    interests.get('/interests', { data: 'data' })
      .then(response => {
        console.log(response);
        this.setState({ interests: response.data.data });
        return response;
      })
      .then(response => {
        let dataFromApi = response.data.data.map
          (interest => { return { value: interest.id, display: interest.attributes.curiosity }; });
        this.setState({ options: dataFromApi });
      });
  };

  render() {
    return (
      <div>
      <div className='field'>
        <label htmlFor='pin_interest_id'>Interest</label>
        <select name="pin[interst_id]" id="pin_interest_id" onChange={this.onSelectChange} value={this.state.value}>
          <option value></option>
          {this.state.options.map((item) => <option key={item.value} value={item.value}>{item.display}</option>)}
        </select>
      </div>
      <div className='field' className={this.state.toggleTopic}>
        <label htmlFor='pin_topic_id'>Topic</label>
        <select name="pin[topic_id]" id="pin_topic_id">
          <option value></option>
        </select>
      </div>
      </div>
    );
  }
};

export default CreatePinForm;
