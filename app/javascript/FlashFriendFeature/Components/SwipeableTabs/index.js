import React, { Component, Fragment } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Swipes from './Swipes'

export default ( { pinData, pinLocation }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (e, value) =>
    setValue(value)

  const handleChangeIndex = (value) =>
    setValue(value)

  return <Fragment>
    <Paper>
      <Tabs value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label='Matches' />
        {
          pinData !== undefined
            ? pinData.map(item =>
                <Tab key={item.id}
                 label={item.id}
                 onClick={ ()=> {pinLocation(item.attributes)} }
                 />
              )
            : null
        }
      </Tabs>
    </Paper>

    <SwipeableViews
      index={value}
      onChangeIndex={handleChangeIndex}
    >
      {
        pinData !== undefined
          ? pinData.map(item =>
            <Swipes pin={item} />
          )
          : <div></div>
      }
      {
          pinData !== undefined && pinData.length === 0
            ? <div> No Records </div>
            : <div></div>

      }
    </SwipeableViews>
  </Fragment>
}
