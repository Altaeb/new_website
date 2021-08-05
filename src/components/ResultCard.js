import React from "react";
import { connect } from "react-redux";
import Nav from "./Nav";

class ResultCard extends React.Component {
  render() {
    const { questions, users, authedUser } = this.props;
    const { id } = this.props.match.params;
    const question = questions && questions[id];

    const author = question && users[question.author];

    let optionOneVotes = 0;
    let optionTwoVotes = 0;
    let optionOnePercentage = 0;
    let optionTwoPercentage = 0;
    let total = 0;
    let authedUserAnswer = "";

    if (question !== undefined) {
      optionOneVotes = Number(question.optionOne.votes.length);
      optionTwoVotes = Number(question.optionTwo.votes.length);
      total = optionOneVotes + optionTwoVotes;
      optionOnePercentage = (optionOneVotes / total) * 100;
      optionTwoPercentage = (optionTwoVotes / total) * 100;
      authedUserAnswer = users[authedUser].answers[id];
    }

    return (
      <React.Fragment>
        <Nav />

        <div
          className="ui cards"
          style={{
            width: "80vw!important",
            marginLeft: "10vw",
            marginRight: "10vw"
          }}
        >
          <div
            className="card"
            style={{ width: "60vw", marginLeft: "10vw", marginRight: "-10vw" }}
          >
            <div className="content">
              <img
                className="right floated mini ui image"
                src={author ? author.avatarUR : undefined}
              />

              <div className="header">{author && author.name}</div>
              <div className="meta">
                <h4>Asks: Would you rather: </h4>{" "}
              </div>
              <div className="description"></div>

              <div className="extra content">
                <div>
                  <div className="ui raised segment">
                    <div style={{ paddingLeft: "1vw" }}>
                      {authedUserAnswer === "optionOne" && (
                        <a className="ui teal right ribbon label">
                          Your Answer
                        </a>
                      )}
                      <h3>
                        <span>{question && question.optionOne.text}</span>
                      </h3>{" "}
                    </div>
                    <br />

                    <div
                      className="card"
                      style={{
                        width: "50vw",
                        marginLeft: "2vw",
                        marginRight: "-4vw",
                        border: "2px solid #00b5ad",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        color: "#122b3b",
                        padding: "15px"
                      }}
                    >
                      <div
                        style={{
                          paddingLeft: "10vw",
                          paddingRight: "10vw"
                        }}
                      >
                        <h2 className="votes">
                          {optionOneVotes} out of {total} votes -{" "}
                          {optionOnePercentage.toFixed(1)}%
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ui horizontal divider">
                  {" "}
                  <h3> OR </h3>
                </div>
                <div className="ui raised segment">
                  <div style={{ paddingLeft: "1vw" }}>
                    {authedUserAnswer === "optionTwo" && (
                      <a className="ui teal right ribbon label">Your Answer</a>
                    )}
                    <h3>
                      <span>{question && question.optionTwo.text}</span>
                    </h3>{" "}
                  </div>
                  <br />
                  <div
                    className="card"
                    style={{
                      width: "50vw",
                      marginLeft: "2vw",
                      marginRight: "-4vw",
                      border: "2px solid #00b5ad",
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                      color: "#122b3b",
                      padding: "15px"
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "10vw",
                        paddingRight: "10vw"
                      }}
                    >
                      <h2 className="votes">
                        {optionOneVotes} out of {total} votes -{" "}
                        {optionTwoPercentage.toFixed(1)}%
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps() {}

export default connect(({ authedUser, questions, users }, props) => {
  return {
    questions,
    users: users ? users : null,
    authedUser: authedUser
  };
})(ResultCard);
