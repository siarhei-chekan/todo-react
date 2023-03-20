import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectsContext } from "../App";

const Login = () => {
  const { setIsAuth } = useContext(ProjectsContext);
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    if (!username || !password) {
      return;
    }

    event.preventDefault();
    setIsAuth(true);
    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("username", username);

    navigate("/");
  };

  return (
    <div className="login">
      <h1 className="login__title">Login please</h1>
      <form className="login__form">
        <input
          type="text"
          placeholder="Enter your login"
          className="input"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          inputMode="numeric"
          placeholder="Enter your password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="button login-btn" onClick={login}>
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
