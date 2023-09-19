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
  const [invalidFields, setInvalidFields] = useState({ email: false, username: false, password: false, confirmPassword: false });
  const renderError = (fieldName) => {
    const error = errors.find(err => err.toLowerCase().includes(fieldName));
    return error ? <small className="field-error">{error}</small> : null;
  };

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    
      setErrors([]);
      
      dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }
          if (data?.errors) {
            setErrors(data.errors);

            // Assuming error messages contain these substrings
            if (data.errors.some(err => err.includes("email"))) {
              setInvalidFields(prev => ({ ...prev, email: true }));
            }
            if (data.errors.some(err => err.includes("username"))) {
              setInvalidFields(prev => ({ ...prev, username: true }));
            }
            if (data.errors.some(err => err.includes("password"))) {
              setInvalidFields(prev => ({ ...prev, password: true }));
            }
          }
        });
        if (password !== confirmPassword) {
          setErrors(['Confirm Password field must be the same as the Password field']);
          setInvalidFields(prev => ({ ...prev, confirmPassword: true }));
        }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {/* <ul className="error-message">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul> */}
        <label>
          Email
          <input
            className={`signup-input ${invalidFields.email ? "input-error" : ""}`}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {renderError("email")}
        </label>
        <label>
          Username
          <input
            className={`signup-input ${invalidFields.username ? "input-error" : ""}`}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {renderError("username")}
        </label>
        <label>
          Password
          <input
            className={`signup-input ${invalidFields.password ? "input-error" : ""}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {renderError("password")}
        </label>
        <label>
          Confirm Password
          <input
            className={`signup-input ${invalidFields.confirmPassword ? "input-error" : ""}`}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.includes("Confirm Password field must be the same as the Password field")
            ? null
            : renderError("confirm password")}
        </label>
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
  
}

export default SignupFormPage;
