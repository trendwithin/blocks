import React from 'react'
import Paper from '@material-ui/core/Paper'
import SwipeMessage from './SwipeMessage'
import MessageForm from '../MessageForm'

export default ({ pin, msgs }) => {
  const { attributes } = pin

  if (pin === undefined) {
    return null
  } else {
      return <Paper>
        <SwipeMessage msgs={msgs} />
        <MessageForm />
      </Paper>
  }
}
