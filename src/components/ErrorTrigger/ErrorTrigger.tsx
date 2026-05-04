import { Component } from 'react';

interface ErrorTriggerState {
  shouldThrow: boolean;
}

class ErrorTrigger extends Component<object, ErrorTriggerState> {
  constructor(props: object) {
    super(props);
    this.state = { shouldThrow: false };
  }

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error triggered by user.');
    }

    return (
      <button
        onClick={this.handleClick}
        className="px-4 py-2 border border-red-300 cursor-pointer text-red-500 rounded-lg hover:bg-red-500  hover:text-gray-50 transition-colors text-sm font-bold"
      >
        Trigger Error
      </button>
    );
  }
}

export default ErrorTrigger;
