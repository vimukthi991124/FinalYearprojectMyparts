import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import validation from "./Validation.js";

function Login({ switchForm }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  function handleValidation(e) {
    e.preventDefault();
    setErrors(validation(values));
  }

  return (
    <div className="login_container">
      <div className="login_form">
        <div className="form">
          <form className="border p-3" onSubmit={handleValidation}>
            <div className="header">
              <h2>Login</h2>
            </div>
            <div className="input">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={values.email}
                name="email"
                onChange={handleInput}
                className="form-control"
              />

              {errors.email && (
                <p style={{ color: "red", fontSize: "13px" }}>{errors.email}</p>
              )}
            </div>
            <div className="input">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={values.password}
                name="password"
                onChange={handleInput}
                className="form-control"
              />
              {errors.password && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.password}
                </p>
              )}
            </div>
            <div className="submit">
              <button className="btn" type="submit">
                Login
              </button>
            </div>
            <div className="remember me">
              <input type="checkbox" />
              Remember me
            </div>
            <br />
            <a href="#" alt="">
              Forgot password
            </a>
            <br />

            <span className="signup-link" onClick={switchForm}>
              Click here to Create Account!
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
