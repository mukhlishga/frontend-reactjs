import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
  return (
    <>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/score">Score</Link>
        </li>
      </nav>
    </>
  )
}

export default Nav