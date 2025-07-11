import { Component } from 'react';

interface ErrorButtonProps {
  onThrowError: () => void;
}

class ErrorButton extends Component<ErrorButtonProps> {
  handleClick = () => {
    this.props.onThrowError();
  };
  render() {
    return (
      <button
        onClick={this.handleClick}
        className="fixed right-6 bottom-6 z-50 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Throw Error
      </button>
    );
  }
}
export default ErrorButton;
