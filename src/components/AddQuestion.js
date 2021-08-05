import React from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import { handleAddQuestion } from "../actions/questions";
import { withRouter } from "react-router-dom";

class AddQuestion extends React.Component {
  state = {
    optionOne: "",
    optionTwo: "",
    error: true
  };
  setOptionOne = optionOne => {
    let error = this.state.optionTwo.trim() === "" ? true : false;
    this.setState({
      optionOne,
      error
    });
  };
  setOptionTwo = optionTwo => {
    let error = this.state.optionOne.trim() === "" ? true : false;
    this.setState({
      optionTwo,
      error
    });
  };
  addQuestion = e => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch, history } = this.props;
    if (optionOne.trim() === "" || optionTwo.trim() === "") {
      return;
    }
    dispatch(
      handleAddQuestion(
        this.state.optionOne,
        this.state.optionTwo,
        this.props.authedUser
      )
    );
    history.push("/");
  };

  render() {
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
            <div style={{ padding: "10px" }}>
              <h4>Would You Rather: </h4>
            </div>
            <div className="content">
              <form className="ui form">
                <div className="field">
                  <label>Option One</label>
                  <input
                    type="text"
                    name="Enter option one..."
                    placeholder="First Name"
                    onChange={e => this.setOptionOne(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Option Two</label>
                  <input
                    type="text"
                    name="last-name"
                    placeholder="Enter option two..."
                    onChange={e => this.setOptionTwo(e.target.value)}
                  />
                </div>

                <button
                  disabled={this.state.error}
                  className="ui button"
                  type="submit"
                  onClick={e => this.addQuestion(e)}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(({ authedUser, questions }) => {
    return {
      authedUser,
      questions
    };
  })(AddQuestion)
);
