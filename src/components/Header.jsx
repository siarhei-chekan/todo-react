import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectsContext } from "../App";

const Header = ({ toggleSidebarVisibility }) => {
  const {setIsAuth} = useContext(ProjectsContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const logOut = () => {
    setIsAuth(false);
    sessionStorage.removeItem('auth');
    navigate('/login');
  };

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"));
    }
  }, []);

  return (
    <header className="header">
      <button
        className="header__button"
        onClick={() => toggleSidebarVisibility()}
      ></button>
      <h3 className="header__title">My Todo</h3>
      <div className="header__profile">
        <h3 className="header__profile_userName">{username}</h3>
        <button
          className="button header__profile_logoutBtn"
          onClick={() => logOut()}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
