import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import useFrameRate from './useFrameRate';

const FrameRate = ({ interval, refreshRate }) => {
  const frameRate = useFrameRate(interval, refreshRate);
  return <span>{frameRate.toFixed(1)}</span>;
};

FrameRate.propTypes = {
  interval: PropTypes.number.isRequired,
  refreshRate: PropTypes.number.isRequired,
};

storiesOf('useFrameRate', module)
  .addDecorator(withKnobs)
  .add('FrameRate', () => (
    <>
      <h1>FrameRate:</h1>
      <FrameRate
        interval={number('interval (ms)', 1000)}
        refreshRate={number('refreshRate (ms)', 100)}
      />
      {/* TODO: put some cool animation here or something */}
    </>
  ));
