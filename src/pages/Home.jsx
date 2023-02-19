import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Outlet />
      {/* <SideBar /> */}
    </div>
  );
};

export default Home;