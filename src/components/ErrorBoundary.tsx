import { Component } from 'react';
import type { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  componentDidCatch(error: Error) {
    // Log error to console as required
    console.error('ErrorBoundary caught an error:', error);
    this.setState({ hasError: true, error });
  }
  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error);
      }
      return (
        <div className="w-full h-80 flex items-center justify-center text-red-600 text-xl font-bold">
          Something went wrong: {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
