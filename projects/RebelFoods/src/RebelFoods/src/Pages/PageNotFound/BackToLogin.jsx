import React from 'react';
import "./pagenotfound.scss";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate=useNavigate()
  return (
    <div className="not-found">
    <h1 className='not-found-heading'>Need To Login</h1>
    <p></p>
    <Button variant="primary"  onClick={()=>{navigate("/")}} style={{width:"auto"}}>Go To Login Page</Button>

  </div>
  );
};

export default NotFound;