import React, { Component, Fragment } from 'react';
import Form from './Form'
import axiosApi from '../../apis/FlashFriendEndPoint'

export default class extends Component {
  state = {
    interests: [],
  }

  async componentDidMount() {
    const { data, status } = await axiosApi.get('/interests')
    if (status == 200)
      this.setState({
        interests: data.data
      })
  }

  render() {
    const { interests } = this.state
    return <Form interests = { interests } />
  }
}
