import React from "react";

import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isAuthenticated] = useState(true);
  return (
    <nav id="navbar">
      <menu>
        <li>
          <NavLink className="nav-link" to={"/"}>
            Builder
          </NavLink>
        </li>
        <li>
          <NavLink to={"/rules"}>Rules</NavLink>
        </li>
        <li style={{ display: isAuthenticated ? "list-item" : "none" }}>
          <NavLink to={"/mydecks"}>My Decks</NavLink>
        </li>
        <li>
          {isAuthenticated ? <span>Logout</span> : <NavLink to={"/login"} />}
        </li>
      </menu>
    </nav>
  );
}

export default Navbar;
