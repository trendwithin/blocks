import React, { Component, Fragment } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Swipes from './Swipes'

export default ( { pinData, getPinLocation, pinId, onPinIdChange, markerMessage }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (e, value) => {
    setValue(value)
    onPinIdChange(value)
  }

  const handleChangeIndex = (value) => {
    setValue(value)
    onPinIdChange(value)
  }

  return <Fragment>
    <Paper>
      <Tabs value={pinId}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {
          pinData !== undefined
            ? pinData.map(item =>
                <Tab key={item.id}
                 label={item.id}
                 onClick={ ()=> { getPinLocation(item.attributes) }}
                />
              )
            : null
        }
      </Tabs>
    </Paper>

    <SwipeableViews
      index={pinId}
      onChangeIndex={handleChangeIndex}
    >
      {
        pinData !== undefined
          ? pinData.map(item =>
            <Swipes pin={item} msgs={markerMessage} />
          )
          : <div></div>
      }
      {
          pinData !== undefined && pinData.length === 0
            ? <Paper><div> No Matches Found </div></Paper>
            : <div></div>

      }
    </SwipeableViews>
  </Fragment>
}
