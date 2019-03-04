import React from "react";

interface PreRenderProps {
  children: React.ReactNode;
  onError?: (...args: any[]) => void;
}

/*
 *   This component will render its children inside a hidden div.
 *   Rendering in the hidden div will have the affect of going through
 *   the rendered components lifecycle, and prefetching any dependencies
 *   which could be data, assets, or lazily-loaded components.
 */
class PreRender extends React.Component<PreRenderProps> {
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

export default PreRender;
