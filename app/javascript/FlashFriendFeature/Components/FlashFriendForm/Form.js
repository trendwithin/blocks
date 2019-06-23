import React, { Fragment } from 'react'
import Grid, { GridSpacing } from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'

const styles = {
  GridSpace: {
    marginTop: 5,
  },
  Paper: {
    padding: 20,
  },
}

export default ({ interests }) =>
  <Fragment>
    <Grid container spacing={1}>
      <Grid item xs>
        <Paper style={styles.Paper}>
          <div className='box'>
            <select>
              <option value>Choose an Interest</option>
              {interests.map(({ id, attributes }) =>
                <option key={id} value={id}>{attributes.curiosity}</option>
              )}
            </select>
          </div>
        </Paper>
      </Grid>

      <Grid item xs>
        <Paper style={styles.Paper}>
          <div className='box'>
            <select>
              <option value>Choose a Topic</option>
            </select>
          </div>
        </Paper>
      </Grid>
    </Grid>

    <Grid container spacing={1} style={styles.GridSpace}>
      <Grid item xs>
        <Paper style={styles.Paper}>
          Button Three
        </Paper>
      </Grid>

      <Grid item xs>
        <Paper style={styles.Paper}>
          Button Four
        </Paper>
      </Grid>
    </Grid>
  </Fragment>
