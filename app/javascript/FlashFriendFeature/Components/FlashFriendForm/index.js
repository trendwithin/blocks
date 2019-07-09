import React, { Component, Fragment } from 'react';
import Form from './Form'
import axiosApi from '../../apis/FlashFriendEndPoint'

export default class extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    interests: [],
    topics: [],
  }

  async componentDidMount() {
    const { data, status } = await axiosApi.get('/interests')
    if (status == 200)
      this.setState({
        interests: data.data
      })
  }

  onInterestSelected = async (value) => {
    const { data, status } = await axiosApi.get(`topics/interest_topics?interest=${value}`)
    if (status == 200)
      this.setState({
        topics: data.data
      })
  }

  onTopicSelected = (e) => {
    this.setState({
      topicId: e.target.value
    })
  }

  handleButtonClicked = async (e) => {
  if (e.target.value === 'find') {
      const { topicId } = this.state
      const { onFindLocalInterestClick } = this.props
      const { data, status } = await axiosApi.get(`/pins?topic=${topicId}`, { data: 'data' })
      if (status === 200) {
        onFindLocalInterestClick(data)
      }
    } else if (e.target.value === 'pin') {
        const userId = document.getElementById('logout-link').getAttribute('data-user')
        const { topicId } = this.state
        const { coords } = this.props
        const { status } = await axiosApi.post('/pins', {
          user_id: userId,
          latitude: coords.lat,
          longitude: coords.lng,
          topic_id: topicId,
        })
    }
  }

  render() {
    const { interests, topics } = this.state
    return (
      <Form
         interests={ interests }
         topics={topics}
         onInterestSelect={this.onInterestSelected}
         onTopicSelect={this.onTopicSelected}
         onButtonClick={this.handleButtonClicked}
      />
    )
  }
}
