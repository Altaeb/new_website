import React from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import { withRouter, Redirect } from "react-router-dom";

class AnswerCard extends React.Component {
  state = {
    answerOption: "",
    error: true,
    loading: false
  };

  handleOptionChange = option => {
    this.setState({
      answerOption: option,
      error: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { answerOption } = this.state;
    const {
      authedUser,
      match: {
        params: { id }
      },
      dispatch,
      history
    } = this.props;

    if (answerOption.trim() === "") {
      return;
    }

    this.setState({
      loading: true
    });
    dispatch(handleAnswerQuestion(id, answerOption, authedUser));
    history.push(`/answerresults/${id}`);

    this.setState({
      loading: false
    });
  };

  render() {
    const { question, author, falidID } = this.props;
    if (!falidID) return <Redirect to="/questions/qid_not_exist" />;
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
            style={{
              width: "60vw",
              marginLeft: "10vw",
              marginRight: "-10vw"
            }}
          >
            <div className="content">
              <img
                className="right floated mini ui image"
                src={author.avatarURL}
              />
              <div className="header">{author.name}</div>
              <div className="meta">
                <h4>Asks: Would you rather : </h4>
              </div>
              <div className="description">
                {question && (
                  <div>
                    <h3>
                      <input
                        type="radio"
                        name="answer"
                        value="optionOne"
                        onChange={e => this.handleOptionChange(e.target.value)}
                      />{" "}
                      {question.optionOne.text}
                    </h3>
                    <div className="ui horizontal divider">
                      <h5> OR </h5>
                    </div>
                    <h3>
                      <input
                        type="radio"
                        name="answer"
                        value="optionTwo"
                        onChange={e => this.handleOptionChange(e.target.value)}
                      />{" "}
                      {question.optionTwo.text} ?
                    </h3>{" "}
                    <br />
                  </div>
                )}
              </div>

              <div className="extra content">
                {question && (
                  <div
                    className="ui two buttons"
                    to={`/answerCard/${question.id}`}
                  >
                    <button
                      disabled={this.state.error}
                      className={
                        `ui basic green button ` +
                        (this.state.loading ? "loading" : null)
                      }
                    >
                      <div onClick={e => this.handleSubmit(e)}>Submit</div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(({ authedUser, questions, users }, props) => {
    const { id } = props.match.params;
    const falidID = questions && Object.keys(questions).includes(id);
    return {
      falidID,
      question: questions && questions[id],
      author:
        (users !== null) & (questions !== null) && questions[id]
          ? users[questions[id].author]
          : {},
      authedUser: authedUser ? authedUser : {}
    };
  })(AnswerCard)
);
