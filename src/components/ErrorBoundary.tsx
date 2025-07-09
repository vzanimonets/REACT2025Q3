import { Component } from 'react';
import type { ReactNode } from 'react';
type ErrorBoundaryProps = {
  children: ReactNode;
};
type ErrorBoundaryState = {
  hasError: boolean;
};
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info);
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 font-semibold p-4 bg-red-50 rounded">
          Something went wrong.
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
