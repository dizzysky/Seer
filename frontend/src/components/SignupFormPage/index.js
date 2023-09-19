import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupFormPage.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [invalidFields, setInvalidFields] = useState({ 
    email: false, username: false, password: false, confirmPassword: false 
  });

  const renderError = (fieldName) => {
    const error = errors.find(err => err.toLowerCase().includes(fieldName));
    return error ? <small className="field-error">{error}</small> : null;
  };

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = [];
  
    if (password !== confirmPassword) {
      newErrors.push("Confirm Password field must be the same as the Password field");
      setInvalidFields(prev => ({ ...prev, confirmPassword: true }));
    }
  
    try {
      await dispatch(sessionActions.signup({ email, username, password }));
    } catch (res) {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) {
        newErrors = [...newErrors, ...data.errors];
      }
    }
    
    setErrors(newErrors);
  };
  

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="field-container">
          <label>Email</label>
          <input
            className={`signup-input ${invalidFields.email ? "input-error" : ""}`}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {renderError("email")}
        </div>
        <div className="field-container">
          <label>Username</label>
          <input
            className={`signup-input ${invalidFields.username ? "input-error" : ""}`}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {renderError("username")}
        </div>
        <div className="field-container">
          <label>Password</label>
          <input
            className={`signup-input ${invalidFields.password ? "input-error" : ""}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {renderError("password")}
        </div>
        <div className="field-container">
          <label>Confirm Password</label>
          <input
            className={`signup-input ${invalidFields.confirmPassword ? "input-error" : ""}`}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {renderError("confirm password")}
        </div>
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
  
}


export default SignupFormPage;
