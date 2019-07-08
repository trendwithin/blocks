import React, { Fragment } from 'react'
import Grid, { GridSpacing } from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import axiosApi from '../../apis/FlashFriendEndPoint'

const styles = {
  Grid: {
    width: '100%',
  },
  GridSpace: {
    marginTop: 5,
    width: '100%',
  },
  Paper: {
    padding: 20,
  },
}

export default (
  { interests,
    topics,
    onInterestSelect,
    onTopicSelect,
    onButtonClick
  }) => {

  const populateTopics = (e) =>
    onInterestSelect(e.target.value)

  const getTopicId = (e) =>
    onTopicSelect(e)

  return <Fragment>
    <Grid container spacing={1} style={styles.Grid}>
      <Grid item xs={6}>
        <Paper style={styles.Paper}>
          <div className='box'>
            <select onChange={populateTopics}>
              <option value>Choose an Interest</option>
              {interests.map(({ id, attributes }) =>
                <option key={id} value={attributes.curiosity}>
                  {attributes.curiosity}
                </option>
              )}
            </select>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <Paper style={styles.Paper}>
          <div className='box'>
            <select onChange={getTopicId}>
              <option value>Choose a Topic</option>
              {topics.map(({ id, attributes }) =>
                <option key={id} value={id}>
                  {attributes.subject}
                </option>
              )}
            </select>
          </div>
        </Paper>
      </Grid>
    </Grid>

    <Grid container spacing={1} style={styles.GridSpace}>
      <Grid item xs={6}>
        <Paper style={styles.Paper}>
          <div className='box'>
            <button onClick={onButtonClick} value='find'>
              Find Local Interest
            </button>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <Paper style={styles.Paper}>
          <button onClick={onButtonClick} value='pin'>Pin Location</button>
        </Paper>
      </Grid>
    </Grid>
  </Fragment>
}
