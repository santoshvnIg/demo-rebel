import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ start, end, duration ,incrementt,decrement}) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const increment = end > start ? 100 : -100;
    const totalIterations = Math.abs(end - start);
    const incrementTime = Math.floor(duration / totalIterations);

    if (count !== end) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount + increment);
      }, incrementTime);

      return () => {
        clearInterval(timer);
      };
    }
  }, [count, duration, end, start]);

  return (
    <div className="counter">
      <span>{count}</span>
    </div>
  );
};

export default AnimatedCounter;