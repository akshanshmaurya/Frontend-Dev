"use strict";

// Q3 - Multi-step form with validation and next/back buttons
const form = document.getElementById('multiForm');
const steps = Array.from(document.querySelectorAll('.step'));

let currentStepIndex = 0; // 0-based index for step 1

function showStep(index) {
  steps.forEach((s, i) => s.classList.toggle('active', i === index));
}

// Field elements
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');

const nameHint = document.getElementById('nameHint');
const emailHint = document.getElementById('emailHint');
const passHint = document.getElementById('passHint');

// Buttons
const next1 = document.getElementById('next1');
const next2 = document.getElementById('next2');
const back2 = document.getElementById('back2');
const back3 = document.getElementById('back3');
const finish = document.getElementById('finish');
const editStart = document.getElementById('editStart');

// Validation utilities
function validateName() {
  const v = nameInput.value.trim();
  if (v.length < 2) { nameHint.textContent = 'Enter at least 2 characters'; return false; }
  nameHint.textContent = '';
  return true;
}

function validateEmail() {
  const v = emailInput.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(v)) { emailHint.textContent = 'Please enter a valid email'; return false; }
  emailHint.textContent = '';
  return true;
}

function validatePassword() {
  const v = passInput.value;
  if (v.length < 6) { passHint.textContent = 'Password must be at least 6 characters'; return false; }
  passHint.textContent = '';
  return true;
}

// Wire up next/back
next1.addEventListener('click', () => {
  if (validateName()) { currentStepIndex = 1; showStep(currentStepIndex); }
});

next2.addEventListener('click', () => {
  if (validateEmail()) { currentStepIndex = 2; showStep(currentStepIndex); }
});

back2.addEventListener('click', () => { currentStepIndex = 0; showStep(currentStepIndex); });
back3.addEventListener('click', () => { currentStepIndex = 1; showStep(currentStepIndex); });

// form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validatePassword()) return;

  // All good — show summary
  const summaryContent = document.getElementById('summaryContent');
  summaryContent.innerHTML = `
    <p><strong>Name:</strong> ${nameInput.value}</p>
    <p><strong>Email:</strong> ${emailInput.value}</p>
    <p><strong>Password:</strong> ${'*'.repeat(passInput.value.length)}</p>
  `;
  currentStepIndex = 3; // show summary
  showStep(currentStepIndex);
});

editStart.addEventListener('click', () => {
  // go back to first step
  currentStepIndex = 0;
  showStep(currentStepIndex);
});

// Live validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passInput.addEventListener('input', validatePassword);

// initialize
showStep(0);

// Export for testing
if (typeof module !== 'undefined' && module.exports) module.exports = { validateName, validateEmail, validatePassword };
