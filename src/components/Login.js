import React, { Fragment, createRef } from "react";
import { connect } from "react-redux";
import { authenticate } from "../actions/authedUser";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  state = {
    LogedUser: ""
  };

  handleLogin = (e, id) => {
    e.preventDefault();
    console.log(id);
    this.props.dispatch(authenticate(id));
  };
  render() {
    const { users } = this.props;

    return (
      <Fragment>
        <div
          className="ui middle aligned center aligned grid"
          style={{ paddingTop: "25vh" }}
        >
          <div className="column">
            <div className="content">
              <div className="ui container  centered one column stackable center aligned page grid ">
                <div>
                  <div
                    className="ui card center "
                    style={{ minWidth: "350px" }}
                  >
                    {" "}
                    <div style={{ padding: "10px", paddingTop: "12px" }}>
                      <h4>Welcome to the Would You Rather App!</h4>
                    </div>
                    <div className="content" style={{ minHeight: "250px" }}>
                      <div className="image">
                        {" "}
                        <img
                          src="/logo.jpg"
                          style={{ width: "250px", height: "250px" }}
                        />{" "}
                      </div>
                    </div>
                    <div className="content">
                      <div className="extra content">
                        <br />
                        <form className="ui form">
                          <div className="ui compact menu">
                            <div className="ui simple dropdown item">
                              Select user to start
                              <i className="dropdown icon"></i>
                              <div className="menu">
                                {users.map(user => {
                                  return (
                                    <div
                                      className="item"
                                      key={user.id}
                                      onClick={e =>
                                        this.handleLogin(e, user.id)
                                      }
                                    >
                                      <img
                                        className="ui avatar image"
                                        src={user && user.avatarURL}
                                      />
                                      {user.name}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <br />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({}) {}

export default connect(({ users, authedUser }) => {
  return {
    users: users !== undefined ? Object.values(users) : [],
    authedUser
  };
})(Login);
