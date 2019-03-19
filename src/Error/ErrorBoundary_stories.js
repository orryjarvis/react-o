import React, { useState, useCallback } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ErrorBoundary from './ErrorBoundary';

const ErrorCauser = () => {
  const [error, setError] = useState(false);
  const causeError = useCallback(() => setError(true), [setError]);
  if (error) {
    throw 'ERROR';
  } else {
    return <button onClick={causeError}>Cause an Error!</button>;
  }
};

const ComponentWithErrorFallback = () => {
  const [key, setKey] = useState(Date.now());
  const reset = useCallback(() => setKey(Date.now()), [setKey]);
  return (
    <div style={{ backgroundColor: 'purple' }}>
      <ErrorBoundary
        key={key}
        onError={action('onError triggered')}
        fallback={
          <>
            <h1>An error occured!</h1>
            <button onClick={reset}>Reset</button>
          </>
        }
      >
        <ErrorCauser />
      </ErrorBoundary>
    </div>
  );
};

storiesOf('ErrorBoundary', module).add('with reset', () => (
  <>
    <h1>Component With Error Fallback:</h1>
    <ComponentWithErrorFallback />
  </>
));
