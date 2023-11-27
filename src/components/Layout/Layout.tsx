import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"

const Layout: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="bg-white">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
