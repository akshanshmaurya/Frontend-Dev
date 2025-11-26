"use strict";

// Q2 - Live Character Counter
const textarea = document.getElementById('message');
const charCounter = document.getElementById('charCounter');
const resetBtn = document.getElementById('resetBtn');

const MAX_CHARS = 100;
const WARNING_THRESHOLD = 20; // turn yellow when remaining <=20

// Update visual counter and enforce boundaries
function updateCounter() {
  const remaining = MAX_CHARS - textarea.value.length;
  charCounter.textContent = remaining >= 0 ? remaining : 0;

  charCounter.classList.remove('warn','danger');
  if (remaining <= 0) {
    charCounter.classList.add('danger');
  } else if (remaining <= WARNING_THRESHOLD) {
    charCounter.classList.add('warn');
  }
}

// prevent further typing when at 0 (preventDefault on keydown or input)
textarea.addEventListener('keydown', function(e) {
  const length = textarea.value.length;
  // allow navigation keys and backspace
  const allowedKeys = ['Backspace','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Delete','Home','End','Tab'];
  if (length >= MAX_CHARS && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
});

// handle paste - only allow up to remaining chars
textarea.addEventListener('paste', function(e) {
  const pasteData = (e.clipboardData || window.clipboardData).getData('text');
  const remaining = MAX_CHARS - textarea.value.length;
  if (pasteData.length > remaining) {
    e.preventDefault();
    // insert trimmed content manually
    const trimmed = pasteData.slice(0, remaining);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = textarea.value.slice(0,start) + trimmed + textarea.value.slice(end);
    textarea.value = newText;
    updateCounter();
  }
});

// input event to ensure charCount always accurate and to trim excess
textarea.addEventListener('input', function(e) {
  if (textarea.value.length > MAX_CHARS) {
    textarea.value = textarea.value.slice(0, MAX_CHARS);
  }
  updateCounter();
});

resetBtn.addEventListener('click', () => {
  textarea.value = '';
  updateCounter();
  textarea.focus();
});

// initialize
updateCounter();

// export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MAX_CHARS };
}
