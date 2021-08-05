import React from "react";
import { connect } from "react-redux";
import Nav from "./Nav";

class LeadrBoard extends React.Component {
  state = {};
  render() {
    const { users } = this.props;

    const leadersArray = Object.values(users)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answers: Object.values(user.answers).length,
        questions: user.questions.length,
        score: Object.values(user.answers).length + user.questions.length
      }))
      .sort((a, b) => a.score - b.score)
      .reverse()
      .slice(0, 3);

    const colors = ["yellow", "orange", "gray"];

    return (
      <React.Fragment>
        <Nav />

        <div
          className="ui link cards"
          style={{
            width: "80vw!important",
            marginLeft: "10vw",
            marginRight: "10vw"
          }}
        >
          {leadersArray.map((leader, index) => {
            return (
              <div key={leader.id} className="card">
                <div className="image">
                  <a className={`ui right corner  label ` + colors[index]}>
                    <i className="trophy icon"></i>
                  </a>
                  <img src={leader.avatarURL} />
                </div>
                <div className="content">
                  <div className="header">{leader.name}</div>
                  <br />
                  <br />

                  <div className="description center aligned">
                    <a className="ui green label">
                      <h3>
                        {" "}
                        <i className="thumbs up icon"></i> Score {leader.score}
                      </h3>
                    </a>
                  </div>
                </div>
                <div className="extra content">
                  <a className="right floated ui  label">
                    <i className="comment icon"></i> {leader.answers}
                  </a>

                  <a className="ui label">
                    <i className="question icon"></i> {leader.questions}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ users }) => {
  return { users };
})(LeadrBoard);
