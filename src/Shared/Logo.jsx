import React from "react";
import logo from "/nnewcopy.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="Logo"
        className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
      />
    </Link>
  );
};

export default Logo;
