import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">
      <span className="navbar-brand mb-0 h1 mx-auto">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          React Lyric Finder
        </Link>
      </span>
    </nav>
  );
};

export default Navbar;
