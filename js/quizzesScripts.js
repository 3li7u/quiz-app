import { getData, getAllCategories, getAllQuizzes } from "./util/DB-util.js";
import { createEl } from "./util/utilities.js";


// get data
const data = await getData();
// get categories
const categories = getAllCategories(data);
// get all quizzes from all category
const quizzes = getAllQuizzes(data);



// Render All Categories To The Quizzes Page
// Get Categories Element
const catContainerEl = document.querySelector('.categories');
// create the category: (All)
const categoryEl = createEl({
  tagName: 'div',
  attrs: [{ key: 'class', value: 'category' }],
  content: [{
    tagName: 'a',
    attrs: [{ key: 'class', value: 'btn btn-white cat-btn' }, { key: 'data-cat', value: 'all' }],
    content: 'All',
  }],
});
// create all ather categories
catContainerEl.append(categoryEl);
categories.forEach(cat => {
  const categoryEl = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'category' }],
    content: [{
      tagName: 'a',
      attrs: [{ key: 'class', value: 'btn btn-white cat-btn' }, { key: 'data-cat', value: cat._id }],
      content: cat.name,
    }],
  });
  catContainerEl.append(categoryEl);
});

// Render All Quizzes To The Quizzes Page
// Get Quizzes Element
const quizzesContainerEl = document.querySelector('.quizzes');
// create all quizzes
quizzes.forEach(quiz => {
  const quizEL = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: ' col quiz' }, { key: 'data-cat', value: quiz.cat_id }],
    content: [{
      tagName: 'a',
      attrs: [{ key: 'href', value: `./quiz.html?id=${quiz._id}` }],
      content: [{
        tagName: 'span',
        attrs: [{ key: 'class', value: 'quiz-title' }],
        content: quiz.name,
      },
      {
        tagName: 'div',
        attrs: [{ key: 'class', value: 'quiz-meta' }],
        content: [{
          tagName: 'span',
          content: `Duration: ${quiz.duration / 60}`,
        },
        {
          tagName: 'span',
          content: `Questions: ${quiz.questionsNumber}`,
        }]
      }],
    }],
  });
  quizzesContainerEl.append(quizEL);
});

// Handle Category Filtering
// get all category buttons
const catBtnsEL = document.querySelectorAll('.category .cat-btn');
// get all quizzes elements
const quizzesEL = document.querySelectorAll('.quizzes .quiz');
// lestening to filter clicks
catBtnsEL.forEach(btn => btn.onclick = () => quizzesEL.forEach(quiz => {
  // hide all quizzes
  quiz.classList.add('hidden');
  // if filter category is (All), show all quizzes
  if (btn.dataset.cat === 'all')
    quiz.classList.remove('hidden');
  // if filter gategory equals quiz category, show those quizzes
  else if (quiz.dataset.cat === btn.dataset.cat)
    quiz.classList.remove('hidden');
}));
