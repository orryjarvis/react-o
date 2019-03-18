import React from 'react';
import PropTypes from 'prop-types';

/*
 *   This component will render its children inside a hidden div.
 *   Rendering in the hidden div will have the affect of going through
 *   the rendered components lifecycle, and prefetching any dependencies
 *   which could be data, assets, or lazily-loaded components.
 *   React will likely give hidden elements a lower priority in the future.
 */
class PreRender extends React.Component {
  // Don't let errors bubble up
  componentDidCatch(error, info) {
    const { onError } = this.props;
    onError && onError(error, info);
  }

  render() {
    return (
      <div hidden={true}>
        {/* Don't let suspenseful components be caught by our catch */}
        <React.Suspense fallback={null}>{this.props.children}</React.Suspense>
      </div>
    );
  }
}

PreRender.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func, // Takes error and info as parameters, i.e onError(error, info);
};

export default PreRender;
