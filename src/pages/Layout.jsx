import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Layout = () => {
  const [isSidebarVisible, setSidebarVisibility] = useState(false);

  const toggleSidebarVisibility = () => setSidebarVisibility(!isSidebarVisible);
  const hideSidebar = () => setSidebarVisibility(false);

  return (
    <>
      <Header toggleSidebarVisibility={toggleSidebarVisibility} />
      <div className="main-container">
        <SideBar open={isSidebarVisible} hideSidebar={hideSidebar} />
        <Outlet className="outlet" />
      </div>
    </>
  );
};

export default Layout;
