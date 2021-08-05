import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFoun";
import AnswerCard from "./AnswerCard";
import ResultCard from "./ResultCard";
import AddQuestion from "./AddQuestion";
import LeaderBoard from "./LeaderBoard";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        {authedUser === null ? (
          <Route render={() => <Login />} />
        ) : (
          <div className="App">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/questions/qid_not_exist" component={NotFound} />
              <Route path="/questions/:id" component={AnswerCard} />
              <Route path="/answerresults/:id" component={ResultCard} />
              <Route path="/addquestion" exact component={AddQuestion} />
              <Route path="/leaderBoard" exact component={LeaderBoard} />
              <Route component={NotFound} />
            </Switch>
          </div>
        )}
      </Router>
    );
  }
}

export default connect(({ authedUser }) => {
  return { authedUser };
})(App);
