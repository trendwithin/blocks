import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function OutlinedTextFields() {
  const classes = useStyles();


  const handleChange = name => event => {
    return ''
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="Message"
        multiline
        rows="4"
        defaultValue=""
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <button>Send Message</button>
    </form>
  );
}
