import React, { useState, useEffect } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { saveToken } from "../../Store/loginSlice";
import loginpic from "./loginpic.png";
import { DataService } from "../../Services/Dataservice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const loginFunction = (formdata) => {
    const tokenData = DataService.LoginUser(formdata);

    toast
      .promise(tokenData, {
        pending: "Waiting for the respose",
      })

      .then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success("API request successful");
          localStorage.setItem("token", res.data.token);
          navigate("/")
          dispatch(saveToken(res.data.token));
        } else {
          toast.error(res.response.data.message);
        }
      })
      .catch((error) => {
        // if (error) {
        //   toast.error(error.message);
        // }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
    } else if (!regex.test(email)) {
      setError("Invalid Email Address!");
    } else {
      const formdata = {
        email,
        password,
      };
      loginFunction(formdata);
      setError("");
    }
  };

  return (
    <div>
      <div className="login-container" id="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <img src={loginpic} style={{ width: "100%" }} alt="" />

          <div className="form-group pt-3">
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
          </div>
          <div className="form-group pt-2">
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          {error && <p className="error">{error}</p>}


          <button type="submit">Login</button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default Login;
