import React from 'react'
import Paper from '@material-ui/core/Paper'

export default ({ pin }) => {
  const { attributes } = pin

  if (pin === undefined) {
    return null
  } else {
      return <Paper>
        <div>{attributes.longitude}</div>
      </Paper>
  }
}
