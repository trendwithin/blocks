import React from 'react'
import Paper from '@material-ui/core/Paper'
import SwipeMessage from './SwipeMessage'

export default ({ pin, msgs }) => {
  const { attributes } = pin

  if (pin === undefined) {
    return null
  } else {
      return <Paper>
        <div>
          {attributes.longitude}
        </div>
        <SwipeMessage msgs={msgs} />
      </Paper>
  }
}
