import { Component } from 'react';
class ErrorButton extends Component {
  handleClick = () => {
    throw new Error('Test error from ErrorButton');
  };
  render() {
    return (
      <button onClick={this.handleClick} style={{ marginTop: 24 }}>
        Throw Error
      </button>
    );
  }
}
export default ErrorButton;
