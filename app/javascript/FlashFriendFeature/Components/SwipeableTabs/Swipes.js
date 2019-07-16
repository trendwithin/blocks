import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import SwipeMessage from './SwipeMessage'
import MessageForm from '../MessageForm'
import axiosApi from '../../apis/FlashFriendEndPoint'

export default class extends Component {
  constructor(props){
    super(props)
  }

  state = {
    messages: []
  }

  componentDidMount() {
    const { pin } = this.props
    this.fetchPinMessage(pin.id)
  }

  fetchPinMessage = async(id) => {
    const { pin } = this.props
    const userMessages = []
    const { data, status } = await axiosApi.get(`/pin_messages?pin=${id}`, { data: 'data' })
    if (status == 200)
      data.data.map(({ attributes }) =>
        userMessages.push(attributes.message)
      )
      this.setState({
        messages: userMessages
      })
  }

  postNewMessage = async(userId, pinId, message) => {
    const { status } = await axiosApi.post('/pin_messages', {
      user_id: userId,
      pin_id: pinId,
      message: message
    })
  }

  handleUserMessage = (msg) => {
    const userId = document.getElementById('logout-link').getAttribute('data-user')
    const { pin } = this.props

    const addMessage = [...this.state.messages, msg]
    this.setState({ messages: addMessage })

    this.postNewMessage(userId, pin.id, msg )
  }

  render() {
    const { pin } = this.props
    if (pin === undefined) {
      return null
    } else {
        return <Paper>
          <SwipeMessage msgs={this.state.messages} />
          <MessageForm userSubmittedMessage={this.handleUserMessage} />
        </Paper>
    }
  }
}
