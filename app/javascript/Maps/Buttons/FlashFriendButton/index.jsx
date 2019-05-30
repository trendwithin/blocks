import React from 'react';

class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      clickedButton: '',
    };
  }

  onButtonClick = async(event) => {
    event.preventDefault();
    await this.setState({
      clicked: this.clicked = !this.clicked,
      clickedButton: event.target.value,
    });
    this.props.onButtonClick(this.state);
  };

  render() {
    return (
      <button onClick={this.onButtonClick}
      value={this.props.text}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
