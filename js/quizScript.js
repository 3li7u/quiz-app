import { getCategoryById, getData, getQuizById } from "./util/DB-util.js";
import {
  CreateQuizDetails,
  createQuestion,
  createQuestionProgress,
  createQuestionTimer,
  createQuizActionBtns,
  createQuizResult,
} from "./util/quiz-util.js";
import { getUniqueRandNum } from "./util/utilities.js";


// Get Quiz ID from Page URL Query Parameters
const quizID = window.location.search.slice(4);

// get data
const data = await getData();

// Get Quiz Data
const quiz = getQuizById(data, quizID);
const { cat_id, name, duration, questionsNumber, questions } = quiz;

// Get Category
const category = getCategoryById(data, cat_id)

// Render Quiz Details
const quizDetailsEl = document.querySelector('.quiz-details');
CreateQuizDetails(quizDetailsEl, { name, category, questionsNumber, duration });

// Render Quiz Action button
const quizActionsEl = document.querySelector('.quiz-action');
createQuizActionBtns(quizActionsEl);

/* Get unique and random values with the number of quize questions
** Ranging from zero to the total number of questions in the database*/
let questionIndexes = getUniqueRandNum(questionsNumber, questions.length);

// The order of the current question
let currentQuesIndex = 0;

// The number of correct answers
let rightAnswers = 0;

// Is the answer correct?
let answerIsValid = false;

// question timer interval
let countDownInterval;

// quiz elements we need to render data in it
const quizArea = document.querySelector('.quiz-area');
const quizActionBtn = document.querySelector('.quiz-action .action-btn');
const quitQuizBtnEL = document.querySelector('.quiz-action .quit-quiz-btn');

// Handle Starting Quiz
quizActionBtn.onclick = () => {
  // Set First Question
  let currentQuestion = questionIndexes[currentQuesIndex];
  // Showing Result stage
  if (currentQuesIndex === null) {
    // show result
    createQuizResult(quizArea, rightAnswers, questionsNumber);
    // set button to restart quiz again
    quizActionBtn.innerText = 'Retake Quiz';
    currentQuesIndex = 0;
    rightAnswers = 0;
  }
  // Start Quiz Stage
  else if (currentQuesIndex === 0) {
    // clear quiz area
    quizArea.innerHTML = '';
    // show quit quiz button
    quitQuizBtnEL.classList.remove('hide');
    // disable submit button until choosing an answer
    quizActionBtn.disabled = true;
    // set action button to submit answers stage
    quizActionBtn.innerText = 'Submit';
    // showing the first question and waiting for the answer
    createQuestionStuff(quizArea, currentQuestion, currentQuesIndex, questionsNumber, questions, duration);
    checkAnswerValidity(questions[currentQuestion]);
    // setting the next question
    currentQuesIndex++;
  }
  // submit answers stage
  else if (currentQuesIndex < questionsNumber) {
    // clear quiz area
    quizArea.innerHTML = '';
    // disable submit button until choosing an answer
    quizActionBtn.disabled = true;
    // checking answer validity
    answerIsValid && rightAnswers++;
    // showing the first question and waiting for the answer
    createQuestionStuff(quizArea, currentQuestion, currentQuesIndex, questionsNumber, questions, duration);
    checkAnswerValidity(questions[currentQuestion]);
    // setting the next question
    currentQuesIndex++;
  }
  // end quiz stage
  else {
    // clear quiz area
    quizArea.innerHTML = '';
    // remove quit quiz button
    quitQuizBtnEL.classList.add('hide');
    // checking last answer validity
    answerIsValid && rightAnswers++;
    // clear last answer timer interval
    clearInterval(countDownInterval);
    // setting the action button on the result stage
    quizActionBtn.innerText = 'Show Result';
    currentQuesIndex = null;
  }
};


// Create Question Stuff
function createQuestionStuff(wereToCreate, questionIndex, questionOrder, questionsNumber, questions, duration) {
  createQuestionProgress(wereToCreate, questionOrder, questionsNumber);
  createQuestionTimer(wereToCreate, duration / questionsNumber);
  clearInterval(countDownInterval);
  countingDownTimer(duration / questionsNumber);
  createQuestion(wereToCreate, questions[questionIndex]);
}

// Check Answer validity
function checkAnswerValidity(question) {
  // reset validity to false, to override the last answer validity
  answerIsValid = false;
  const answers = document.getElementsByName('answer');
  answers.forEach(ans => {
    ans.onchange = () => {
      // enable submit button while choosing answer
      ans.checked && (quizActionBtn.disabled = false);
      // set the checked answer as valid if and only if it equals the right one
      answerIsValid = (ans.checked) && (ans.dataset.answer === question.rightAnswer);
    }
  });
};

// Handle Timer
function countingDownTimer(duration) {
  const mainDuration = duration;
  const quizTimerContainerEl = document.querySelector('.question-timer');
  const quizTimerEl = document.querySelector('.question-timer p');
  let min, sec;
  duration--;
  countDownInterval = setInterval(() => {
    min = parseInt(duration / 60);
    sec = parseInt(duration % 60);
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    quizTimerEl.innerText = `${min}:${sec}`;
    duration === parseInt(mainDuration * 3 / 4) && quizTimerContainerEl.classList.add('timer-75');
    duration === parseInt(mainDuration / 2) && quizTimerContainerEl.classList.add('timer-50');
    duration === parseInt(mainDuration / 4) && quizTimerContainerEl.classList.add('timer-25');
    if (--duration < 0) {
      clearInterval(countDownInterval);
      quizActionBtn.disabled = false;
      quizActionBtn.click();
    }
  }, 1000)
}
