import React from "react";
import { NavLink } from "react-router-dom";

const NotFoun = props => {
  return (
    <React.Fragment>
      <h4>Page Not found 404 Error </h4>
      <NavLink to="/" exact>
        Go To Home
      </NavLink>
    </React.Fragment>
  );
};

export default NotFoun;
