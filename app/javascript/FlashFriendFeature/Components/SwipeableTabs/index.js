import React, { Component, Fragment } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'

export default ( { pinData }) => {
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
        <Tab label='All' />
        <Tab label='Next' />
        {
          pinData !== undefined
            ? pinData.map(item =>
                <Tab key={item.id} label={item.id} />
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
             <div key={item.id}>{item.attributes.longitude}</div>
          )
          : <div>Loading</div>
      }
      <div>{value}</div>
      <div>New Item</div>
      <div>Last Item</div>
    </SwipeableViews>
  </Fragment>
}
