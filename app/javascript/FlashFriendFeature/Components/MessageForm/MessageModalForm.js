import React, { Component } from 'react';
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



export default class MessageModalForm extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    message: ''
  }

  handleButtonClick = (e) => {
    e.preventDefault()
    const { onUserSubmit } = this.props
    onUserSubmit(this.state.message)
  }

  handleInputChange = (e) => {
    const msg = e.target.value
    this.setState({ message: msg })
  }

  mountClasses = () => {
    const classes = useStyles()
    return classes
  }

  componentDidMount() {
    this.mountClasses
  }

  render() {
    const classes = this.mountClasses
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
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleButtonClick}>Send Message</button>
      </form>
    )
  }
}
