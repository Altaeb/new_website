import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate } from "../actions/authedUser";

const Nav = props => {
  const handleLogout = e => {
    e.preventDefault();
    props.dispatch(authenticate(null));
    props.history.push("/");
  };

  const { authedUser, users, history } = props;
  const { pathname } = history.location;
  return (
    <Fragment>
      <div className="ui secondary pointing menu">
        <Link to="/" className={`item ` + (pathname === "/" ? "active" : null)}>
          Home
        </Link>
        <Link
          to="/addquestion"
          className={`item ` + (pathname === "/addquestion" ? "active" : null)}
        >
          {" "}
          Add Question
        </Link>
        <Link
          to="/leaderboard"
          className={`item ` + (pathname === "/leaderboard" ? "active" : null)}
        >
          Leader Board
        </Link>

        <div className="right item">
          <div
            className="ui  button"
            style={{ marginRight: "5px" }}
            onClick={e => handleLogout(e)}
          >
            Logout
          </div>

          <div>
            {authedUser !== null && users[authedUser].name}
            <img
              className="ui  avatar image "
              src={authedUser ? users[authedUser].avatarURL : undefined}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(
  connect(({ authedUser, users }) => {
    return { authedUser, users };
  })(Nav)
);
