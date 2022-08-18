// Get All Data
export async function getData() {
  try {
    const response = await fetch('./js/data.json');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get All Categories
export function getAllCategories(data) {
  const categories = data.map(({ _id, name }) => ({ _id, name }));
  return categories;
}

// Get Specific Category By ID
export function getCategoryById(data, catID) {
  const category = getAllCategories(data).filter(({ _id, name }) => _id === catID);
  return category.length === 1 && category[0].name;
}

// Get All Quizzes from All Categories
export function getAllQuizzes(data) {
  let allQuizzes = [];
  data.forEach(({ _id, quizzes }) => quizzes.forEach(quiz => allQuizzes.push({ ...quiz, cat_id: _id })));
  return shuffle(allQuizzes);
}

// Get Specific Quize by ID
export function getQuizById(data, quizID) {
  const quiz = getAllQuizzes(data).filter(quiz => quiz._id === quizID);
  return quiz.length === 1 && quiz[0];
}

// Shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}