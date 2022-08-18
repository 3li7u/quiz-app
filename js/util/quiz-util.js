import { createEl } from "./utilities.js";


// Create Quiz Details
export function CreateQuizDetails(wereToCreate, quizData) {
  // category
  const quizCatEl = createEl({
    tagName: 'h5',
    content: quizData.category,
  });
  wereToCreate.append(quizCatEl);

  // name
  const quizNameEl = createEl({
    tagName: 'h2',
    content: quizData.name,
  });
  wereToCreate.append(quizNameEl);

  const hrs = parseInt(quizData.duration / (60 * 60));
  const mins = parseInt((quizData.duration % (60 * 60)) / 60);
  const quizMetaEl = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'quiz-meta' }],
    content: [
      {// number
        tagName: 'span',
        content: `Questions: ${quizData.questionsNumber}`,
      },
      {// duration
        tagName: 'span',
        content: `Duration: ${hrs > 0 ? hrs + 'hr' : ''} ${mins > 0 ? mins + 'Min' : ''}`,
      }
    ],
  });
  wereToCreate.append(quizMetaEl);
};

// Create Quiz Action Buttons
export function createQuizActionBtns(wereToCreate) {
  // Quiz Action
  const actionBtnEl = createEl({
    tagName: 'button',
    attrs: [{ key: 'class', value: 'btn btn-white action-btn' }],
    content: 'Start Now',
  });
  wereToCreate.append(actionBtnEl);

  // Quit Quiz Button
  const goBackBtnEL = createEl({
    tagName: 'a',
    attrs: [{ key: 'class', value: 'btn btn-white quit-quiz-btn hide' }, { key: 'href', value: './quizzes.html' }],
    content: 'Quit Quiz'
  });
  wereToCreate.append(goBackBtnEL);
};

// Create Quiz Result
export function createQuizResult(wereToCreate, rightAnswers, questionsNumber) {
  const result = (rightAnswers * 100) / questionsNumber;
  const quizResultEl = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'quiz-result' }],
    content: [{
      tagName: 'i',
      attrs: [{ key: 'class', value: `fa-solid ${result >= 60 ? 'fa-check-circle' : 'fa-close'}` }]
    },
    {
      tagName: 'h2',
      content: `${result.toFixed(2)}%`,
    },
    {
      tagName: 'p',
      content: result >= 60 ? 'Congratulations! You Passed.' : 'You Failed. Good Luck!',
    },
    {
      tagName: 'p',
      content: `You answered correctly: ${rightAnswers} / ${questionsNumber}`,
    }],
  });
  wereToCreate.append(quizResultEl);
}

// Create Question Progress
export function createQuestionProgress(wereToCreate, currentQuestion, questionsNumber) {
  const progressEL = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'question-progress' }],
    content: [
      {
        tagName: 'div',
        attrs: [{ key: 'class', value: 'fill' }, { key: 'style', value: `width: ${((currentQuestion + 1) * 100) / (questionsNumber)}%` }],
      },
      {
        tagName: 'div',
        attrs: [{ key: 'class', value: 'question-number' }],
        content: `${(currentQuestion + 1)} / ${questionsNumber}`,
      },
    ]
  });
  wereToCreate.append(progressEL)
};

// Create Question Timer
export function createQuestionTimer(wereToCreate, duration) {
  let min = parseInt(duration / 60);
  let sec = parseInt(duration % 60);
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;
  const questionTimerEl = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'question-timer', },],
    content: [{
      tagName: 'p',
      content: `${min}:${sec}`
    }],
  });
  wereToCreate.append(questionTimerEl);
}

// Create Question Stuff
export function createQuestion(wereToCreate, questionData) {
  // question
  const questionEl = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'question' }],
    content: [{ tagName: 'h4', content: questionData.question }],
  });
  wereToCreate.append(questionEl);
  // answers
  createAnswers(wereToCreate, questionData.answers)
}

// Create Answers For Spesific Question
function createAnswers(wereToCreate, answers) {
  const answersEl = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'answers' }],
  });
  answers.forEach(ans => {
    const answerEl = createEl({
      tagName: 'div',
      attrs: [{ key: 'class', value: 'answer' }],
      content: [
        {
          tagName: 'label',
          attrs: [{ key: 'for', value: ans.key }],
          content: [{
            tagName: 'input',
            attrs: [{ key: 'type', value: 'radio' }, { key: 'id', value: ans.key }, { key: 'name', value: 'answer' }, { key: 'data-answer', value: ans.key }],
          },
          {
            tagName: 'span',
            content: ans.answer,
          }],
        }
      ],
    });
    answersEl.append(answerEl);
  });
  wereToCreate.append(answersEl)
}