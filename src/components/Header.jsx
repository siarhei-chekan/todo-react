import React from "react";

const Header = ({ toggleSidebarVisibility }) => {
  return (
    <header className="header">
      <button
        className="header__button"
        onClick={() => toggleSidebarVisibility()}
      ></button>
      <h3 className="header__title">My Todo</h3>
    </header>
  );
};

export default Header;
