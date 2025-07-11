import { Component } from 'react';
import type { ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: (boundaryError: Error | null) => ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error });
  }
  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }
  render() {
    return this.props.children(this.state.error);
  }
}
export default ErrorBoundary;
