import React from 'react';
import "./pagenotfound.scss";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate=useNavigate()
  return (
    <div className="not-found">
    <h1 className='not-found-heading'>404 - Page Not Found</h1>
    <p>The requested page could not be found.</p>
    <Button variant="primary"  onClick={()=>{navigate("/")}} style={{width:"auto"}}>Back to homepage</Button>

  </div>
  );
};

export default NotFound;