import React from "react";
import "./inProgress.scss";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

const InProgress = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1 className="not-found-heading">Coming Soon...</h1>
      <br />

      <Button
        variant="primary"
        onClick={() => {
          navigate("/");
        }}
        style={{ width: "auto" }}
      >
        Back to homepage
      </Button>
    </div>
  );
};

export default InProgress;
