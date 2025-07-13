import { Component } from 'react';

interface ErrorButtonProps {
  onThrowError: () => void;
}

class ErrorButton extends Component<ErrorButtonProps> {
  handleClick = () => {
    throw new Error('ErrorButton: Искусственная ошибка!');
    this.props.onThrowError();
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        className="fixed right-6 bottom-6 z-50 bg-orange-400 text-white dark:bg-orange-600 dark:text-gray-100 px-4 py-2 rounded-md shadow hover:bg-orange-500 dark:hover:bg-orange-700 active:bg-orange-600 dark:active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300 border-none"
      >
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
