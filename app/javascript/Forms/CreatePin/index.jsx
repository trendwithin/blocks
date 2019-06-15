import React from 'react';
import axiosApi from '../apis/VersionOne';
import Button from '../../Maps/Buttons/FlashFriendButton';

class CreatePinForm extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    interests: [],
    topics: [],
    topicId: 0,
  };



  handleButtonClick = async(event) => {
    event.preventDefault();
    if (event.target.value === 'findLocalPinsButton') {
      const topicId = this.state.topicId
      await axiosApi.get(`/pins?topic=${topicId}`, { data: 'data' })
      .then(response => {
        this.props.localPins(response.data.data);
        // const userClicked = this.state.findLocalPinsClicked = !this.state.findLocalPinsClicked;
        // this.setState(
        //   { flashFriends: response.data.data,
        //     findLocalPinsClicked: userClicked,
        //   }
        // );
        // this.mapMarkers(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
    } else if (event.target.value === 'pinLocationButton') {
      this.props.pinLocation();
    }
  }

  componentDidMount() {
    axiosApi.get('/interests', { data: 'data' })
      .then(response => {
        let dataFromApi = response.data.data.map
          (interest => { return { value: interest.id, display: interest.attributes.curiosity }; });
        this.setState({ interests: dataFromApi });
      });
  };

  onInterestChange = () => {
    this.props.showTopic();
    this.onInterestChosen();
  }

  onInterestChosen = async () => {
    await axiosApi.get(`topics/interest_topics?interest=${event.target.value}`)
      .then(response => {
        let dataFromApi = response.data.data.map
          (topic => { return { value: topic.id, display: topic.attributes.subject }; });
        this.setState({ topics: dataFromApi });
    });
  }

  onTopicChange = (event) => {
    this.setState({ topicId: event.target.value });
    this.props.showButtons();
  }

  render() {
    return (
      <div className='flex-flash-form-container'>
      <div className='flex flex-row flex-wrap'>
        <div className='field flex flex-column w-50'>
          <label htmlFor='pin_interest_id'>Interest</label>
          <select name="pin[interst_id]" id="pin_interest_id"
            onChange={this.onInterestChange}
          >
            <option value>Choose an Interest</option>
            { this.state.interests.map((item) =>
              <option key={item.value} value={item.display}>{item.display}</option>)
            }
          </select>
        </div>
        <div className='w-50'>
          <div className={this.props.hiddenTopic}>
            <div className='field flex flex-column'>
              <label htmlFor='pin_topic_id'>Topic</label>
              <select name="pin[topic_id]" id="pin_topic_id"
                onChange={this.onTopicChange}
              >
                <option value>Choose a Topic</option>
                { this.state.topics.map((item) =>
                    <option key={item.value} value={item.value}>{item.display}</option>)
                }
              </select>
            </div>
          </div>
        </div>
        <div className='field flex flex-column w-50'>
          <div className={this.props.hiddenPinLocation}>
            <button onClick={this.handleButtonClick} value='pinLocationButton'>Pin Location</button>
          </div>
        </div>
        <div className='field flex flex-column w-50'>
          <div className={this.props.hiddenPinLocation}>
            <button onClick={this.handleButtonClick} value='findLocalPinsButton'>Find Local Pins</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
};

export default CreatePinForm;
