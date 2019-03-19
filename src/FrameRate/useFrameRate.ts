import { useEffect, useState, useRef, useCallback } from 'react';
import throttle from 'lodash.throttle';

const useFrameRate = (
  interval: number = 1000,
  refreshRate: number = 100
): number => {
  const savedFrames = useRef(0);
  const savedTick = useRef(Date.now());
  const [rate, setRate] = useState(0);

  // Don't call setRate more frequently than every 50ms.. even if the
  // given refreshRate would make it so. The client device is unlikely to
  // be able to re-render much more frequently than that. Even at this rate,
  // some devices might still have an issue- This is kind of dangerous
  // in react-land.
  const throttledSetRate = useCallback(throttle(setRate, 50), [
    setRate,
    throttle,
  ]);
  useEffect(() => {
    let frameRequest: number;
    const onFrameRequest = (): void => {
      const now = Date.now();
      if (now >= savedTick.current + refreshRate) {
        throttledSetRate(
          ((savedFrames.current + 1) / (now - savedTick.current)) * interval
        );
        savedFrames.current = 0;
        savedTick.current = now;
      } else {
        savedFrames.current += 1;
      }
      frameRequest = window.requestAnimationFrame(onFrameRequest);
    };
    frameRequest = window.requestAnimationFrame(onFrameRequest);
    return () => window.cancelAnimationFrame(frameRequest);
  }, [interval, refreshRate]);
  return rate;
};

export default useFrameRate;
