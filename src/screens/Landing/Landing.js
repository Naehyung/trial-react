import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

export default function Landing() {
  return (
    <div className="landingMain">
      <h1>TeamPro</h1>
      <Link to="/signup">
        <button id="signup">Sign Up</button>
      </Link>
      <Link to="/signin">
        <button id="signin">Sign In</button>
      </Link>
    </div>
  );
}
