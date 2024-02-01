import React from "react";
import { Outlet } from "react-router-dom";
import BackButton from "./BackButton";

function Layout() {
  return (
    <div>
      <BackButton />
      <Outlet />
    </div>
  );
}

export default Layout;
