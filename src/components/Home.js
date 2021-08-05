import React from "react";
import { connect } from "react-redux";

import Nav from "./Nav";
import Question from "./Question";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  state = {
    activeTab: "unasnswered"
  };

  componentDidMount() {
    const { authedUser, history } = this.props;
    if (authedUser === null) {
      history.push("/");
    }
  }

  switchActivTab = (e, name) => {
    e.preventDefault();
    this.setState({
      activeTab: name
    });
    console.log(this.state.activeTab);
  };

  render() {
    const { activeTab } = this.state;
    const unansweredActive = activeTab === "unasnswered" ? "active" : "";
    const answeredActive = activeTab === "unasnswered" ? "" : "active";

    const { questions, users, authedUser } = this.props;

    const userAnswers = authedUser
      ? Object.keys(users[authedUser].answers)
      : [];
    const unanserrdQuestions = questions
      .filter(question => !userAnswers.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    const anserrdQuestions = questions
      .filter(question => userAnswers.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div>
        <Nav />

        <br />

        <div
          className="ui two top attached buttons"
          style={{
            width: "80vw!important",
            marginLeft: "10vw",
            marginRight: "10vw"
          }}
        >
          <div
            className={"ui button " + unansweredActive}
            onClick={e => this.switchActivTab(e, "unasnswered")}
          >
            Unasnswered
          </div>
          <div
            className={"ui button " + answeredActive}
            onClick={e => this.switchActivTab(e, "asnswered")}
          >
            Ansnswered
          </div>
        </div>
        <div
          style={{
            width: "80vw!important",
            marginLeft: "10vw",
            marginRight: "10vw"
          }}
        >
          {activeTab == "unasnswered" ? (
            <div className="ui attached segment">
              {questions &&
                unanserrdQuestions.map(question => {
                  return (
                    <Question
                      key={question.id}
                      question={question}
                      auther={users[question.author]}
                      answered={false}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="ui attached segment">
              {questions &&
                anserrdQuestions.map(question => {
                  return (
                    <Question
                      key={question.id}
                      question={question}
                      auther={users[question.author]}
                      answered={true}
                    />
                  );
                })}
            </div>
          )}
        </div>

        <br></br>
      </div>
    );
  }
}

export default connect(({ authedUser, questions, users }) => {
  return {
    authedUser,
    users: questions !== null ? users : {},
    questions: questions !== null ? Object.values(questions) : []
  };
})(Home);
