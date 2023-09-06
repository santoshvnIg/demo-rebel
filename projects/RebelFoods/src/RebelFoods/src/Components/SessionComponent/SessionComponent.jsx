import React, { useState, useEffect } from 'react';
import "./sessionComponent.scss";

const SessionComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    let sessionTimeout;
    let visibilityChangeTimeout;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        clearTimeout(sessionTimeout);
      } else {
        visibilityChangeTimeout = setTimeout(() => {
          setShowPopup(true);
        }, 3000); // 5 minutes in milliseconds
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    sessionTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // 20 minutes in milliseconds

    return () => {
      clearTimeout(sessionTimeout);
      clearTimeout(visibilityChangeTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleDismiss = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [showPopup, countdown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };
 
  
  return (
    <>
      {showPopup && (
        <div className="session-popup">
          <p>Your session will expire in:</p>
          <p className="countdown">{formatTime(countdown)}</p>
          <button onClick={handleDismiss}>Dismiss</button>
        </div>
      )}
    </>
  );
};
export default SessionComponent;
