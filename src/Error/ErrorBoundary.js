import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
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

ErrorBoundary.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  onError: PropTypes.func // Takes error and info as parameters, i.e onError(error, info);
};

ErrorBoundary.defaultProps = {
  fallback: null
};

export default ErrorBoundary;
