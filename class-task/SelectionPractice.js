// SelectionPractice.js
// Task: Use DOM selectors to change colors of the three paragraphs
// Requirements implemented:
//  - select all <p> with querySelectorAll('p')
//  - change first -> red, second -> blue, third -> green

// Wrap in DOMContentLoaded to ensure elements are available
document.addEventListener('DOMContentLoaded', () => {
  // select all paragraph elements on the page
  const paragraphs = document.querySelectorAll('p');
  console.log('Found paragraphs:', paragraphs.length);

  // Defensive checks in case the HTML structure changes
  if (paragraphs.length >= 1) paragraphs[0].style.color = 'red';
  if (paragraphs.length >= 2) paragraphs[1].style.color = 'blue';
  if (paragraphs.length >= 3) paragraphs[2].style.color = 'green';

  // Informational logs for students
  console.log('Paragraph colors updated: 1 -> red, 2 -> blue, 3 -> green');
});

// This file is intended to run in the browser (attached to SelectionPractice.html)
