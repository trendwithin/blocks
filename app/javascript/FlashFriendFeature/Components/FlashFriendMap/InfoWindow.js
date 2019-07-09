import React from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}

function InfoWindow(props) {
  const { classes } = props
  const { content } = props
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    </div>
  )
}

export default withStyles(styles)(InfoWindow);
