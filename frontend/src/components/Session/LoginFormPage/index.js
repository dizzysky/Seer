import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [invalidFields, setInvalidFields] = useState({
        credential: false,
        password: false,
    });

    if (sessionUser) return <Redirect to="/photos" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if, e.g., server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);

                if (errors.includes("some credential error")) {
                    setInvalidFields((prev) => ({ ...prev, credential: true }));
                }
                if (errors.includes("some password error")) {
                    setInvalidFields((prev) => ({ ...prev, password: true }));
                }
            }
        );
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <ul className="error-message">
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <input
                        className={`login-input ${
                            invalidFields.credential ? "input-error" : ""
                        }`}
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder="username or email"
                        required
                    />
                    <input
                        className={`login-input ${
                            invalidFields.password ? "input-error" : ""
                        }`}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        required
                    />

                    <button type="submit" className="login-button">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginFormPage;
