import { createEl } from './util/utilities.js';

// Get Bullets Container Element
const bulletContainerEl = document.querySelector('.bullets');

// Get Slides Elements
const slides = document.querySelectorAll('.slide-container .slide');

// create bullet for each slide
for (let i = 0; i < slides.length; i++) {
  const bulletEl = createEl({
    tagName: 'div',
    attrs: [{ key: 'class', value: 'bullet' }],
  });
  bulletContainerEl.append(bulletEl);
};

// Get Bullets
const bullets = document.querySelectorAll('.bullets .bullet');

// current slide
let currentSlide = 0;
showSlide(currentSlide);
setInterval(() => {
  currentSlide >= (slides.length - 1) && (currentSlide = -1)
  showSlide(++currentSlide);
}, 4000)


// show current slide 
function showSlide(current) {
  slides.forEach(slide => slide.classList.add('hide-slide'));
  slides[current].classList.remove('hide-slide');
  bullets.forEach(bullet => bullet.classList.remove('active'));
  bullets[current].classList.add('active');
};

// handle bullets click
for (let i = 0; i < bullets.length; i++) {
  bullets[i].onclick = () => {
    currentSlide = i;
    showSlide(currentSlide);
  };
}