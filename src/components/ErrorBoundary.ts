import React from "react";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
  onError?: (...args: any[]) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;
    this.setState({ hasError: true }, () => onError && onError(error, info));
  }

  render() {
    const { children, fallback } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return fallback;
    }
    return children;
  }
}

export default ErrorBoundary;
