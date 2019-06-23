import React, { Component, Fragment } from 'react';
import Form from './Form'
import axiosApi from '../../apis/FlashFriendEndPoint'

export default class extends Component {
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
    console.log(value)
    const { data, status } = await axiosApi.get(`topics/interest_topics?interest=${value}`)
    console.log(status);
    if (status == 200)
      this.setState({
        topics: data.data
      })

    console.log(this.state);
  }

  render() {
    const { interests, topics } = this.state
    return <Form interests={ interests } topics={topics} onSelect={this.onInterestSelected}/>
  }
}
