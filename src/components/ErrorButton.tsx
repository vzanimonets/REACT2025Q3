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
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Throw Error
      </button>
    );
  }
}
export default ErrorButton;
