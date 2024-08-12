import React from "react";

// import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  // const [isAuthenticated] = useState(true);
  return (
    <nav id="navbar">
      <menu>
        <li>
          <NavLink
            className={useLocation().pathname === "/" ? "current" : ""}
            to={"/"}
          >
            Builder
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            className={useLocation().pathname === "/rules" ? "current" : ""}
            to={"/rules"}
          >
            Rules
          </NavLink>
        </li>
        <li
          className={useLocation().pathname === "/mydecks" ? "current" : ""}
          style={{ display: isAuthenticated ? "list-item" : "none" }}
        >
          <NavLink to={"/mydecks"}>My Decks</NavLink>
        </li>
        <li>
          {isAuthenticated ? <span>Logout</span> : <NavLink to={"/login"} />}
        </li> */}
      </menu>
    </nav>
  );
}

export default Navbar;
