import React, { useState, useEffect } from "react";

const ClockComponent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className="clock" style={{ color: "#ffffff", paddingTop: "5px" }}>
      {formatTime(time)}
    </div>
  );
};

export default ClockComponent;
