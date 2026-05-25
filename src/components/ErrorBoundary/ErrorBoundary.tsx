import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
          <div className="text-6xl mb-6">💥</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-500 text-center max-w-sm mb-8">
            An unexpected error occurred. The details have been logged to the
            console.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-2.5 bg-green-500 text-slate-900 rounded-lg hover:bg-green-400 transition-colors font-semibold"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
