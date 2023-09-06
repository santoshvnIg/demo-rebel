import React, { useState, useEffect } from "react";
import { DataService } from "../../Services/Dataservice";
import { useNavigate } from "react-router-dom";

function SessionLogoutComponent() {
  const [userLoggedIn, setUserLoggedIn] = useState(true); // Replace this with your authentication logic
  const inactivityDuration = 1 * 60 * 1000; // 1 hour in milliseconds
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    let inactivityTimeout;

    function resetInactivityTimer() {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logout, inactivityDuration);
    }

    function logout() {
      let logout = DataService.LogoutApi(token);

      logout
        .then((res) => {
          if (res.status === 200) {
            localStorage.removeItem("token");
            navigate("/");
            window.location.reload();
          }
        })
        .catch((error) => {});

      setUserLoggedIn(false); // For demonstration purposes, we'll just update the state
    }

    // Add event listeners to reset the timer on user activity
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keydown", resetInactivityTimer);

    // Initialize the timer on component mount
    resetInactivityTimer();

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(inactivityTimeout);
      document.removeEventListener("mousemove", resetInactivityTimer);
      document.removeEventListener("keydown", resetInactivityTimer);
    };
  }, []);

  return (
    <>
      {/* {showPopup && (
        <>
          <Modal
            show={showPopup}
            onHide={handleClosePopup}
            backdrop="static"
            keyboard={false}
            className="logoutModel"
          >
            <Modal.Header closeButton>
              <Modal.Title>Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              Your session will be expired within{" "}
              <span className="red-text">
                {(logoutTimer / 60).toFixed(2)} minutes.
              </span>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="closebutton"
                onClick={handleClosePopup}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="logoutbutton"
                onClick={handleCancelLogout}
              >
                Logout
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )} */}
    </>
  );
}

export default SessionLogoutComponent;
