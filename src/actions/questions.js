import { saveQuestionAnswer, saveQuestion } from "../utils/dataAPI";
import {
  handleAddQuestionToUser,
  handleAddAnswerToUser
} from "../actions/users";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author
    }).then(question => {
      dispatch(addQuestion(question));
      dispatch(handleAddQuestionToUser(question));
    });
  };
}

function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  };
}

export function handleAnswerQuestion(qid, answer, authedUser) {
  console.log(qid, authedUser, answer);
  return dispatch => {
    return saveQuestionAnswer({
      qid,
      authedUser,
      answer
    }).then(data => {
      dispatch(answerQuestion(authedUser, qid, answer));
      dispatch(handleAddAnswerToUser(authedUser, qid, answer));
    });
  };
}
