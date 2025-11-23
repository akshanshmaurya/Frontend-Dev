// ===== Q2: Student Form Validator =====
// Form validation using RegExp

'use strict';

// Regular expressions for validation
const validators = {
    // Name: only alphabets and spaces
    name: /^[a-zA-Z\s]+$/,
    
    // Email: valid format (example@domain.com)
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Phone: exactly 10 digits
    phone: /^\d{10}$/,
    
    // Password: 1 uppercase, 1 number, 1 special character
    uppercase: /[A-Z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
};

// Form elements
const form = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');

// Error message elements
const errors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    phone: document.getElementById('phoneError'),
    password: document.getElementById('passwordError')
};

// Password hint elements
const hints = {
    upper: document.getElementById('hint-upper'),
    number: document.getElementById('hint-number'),
    special: document.getElementById('hint-special')
};

// Validation functions
function validateName(value) {
    if (!value.trim()) {
        return { valid: false, message: '❌ Name is required' };
    }
    if (!validators.name.test(value)) {
        return { valid: false, message: '❌ Name must contain only alphabets and spaces' };
    }
    if (value.trim().length < 3) {
        return { valid: false, message: '❌ Name must be at least 3 characters long' };
    }
    return { valid: true, message: '✅ Name is valid' };
}

function validateEmail(value) {
    if (!value.trim()) {
        return { valid: false, message: '❌ Email is required' };
    }
    if (!validators.email.test(value)) {
        return { valid: false, message: '❌ Email must be in format: example@domain.com' };
    }
    return { valid: true, message: '✅ Email is valid' };
}

function validatePhone(value) {
    if (!value.trim()) {
        return { valid: false, message: '❌ Phone number is required' };
    }
    if (!validators.phone.test(value)) {
        return { valid: false, message: '❌ Phone must be exactly 10 digits' };
    }
    return { valid: true, message: '✅ Phone is valid' };
}

function validatePassword(value) {
    if (!value) {
        return { valid: false, message: '❌ Password is required' };
    }

    let valid = true;
    let missingReqs = [];

    if (!validators.uppercase.test(value)) {
        valid = false;
        missingReqs.push('uppercase letter');
    }
    if (!validators.number.test(value)) {
        valid = false;
        missingReqs.push('number');
    }
    if (!validators.special.test(value)) {
        valid = false;
        missingReqs.push('special character');
    }

    if (!valid) {
        return { 
            valid: false, 
            message: `❌ Password must contain: ${missingReqs.join(', ')}` 
        };
    }

    return { valid: true, message: '✅ Password is strong' };
}

// Update visual feedback
function updateFieldVisuals(input, isValid) {
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
}

// Handle name validation
nameInput.addEventListener('blur', function() {
    const validation = validateName(this.value);
    const errorEl = errors.name;
    
    errorEl.textContent = validation.message;
    updateFieldVisuals(this, validation.valid);
});

// Handle email validation
emailInput.addEventListener('blur', function() {
    const validation = validateEmail(this.value);
    const errorEl = errors.email;
    
    errorEl.textContent = validation.message;
    updateFieldVisuals(this, validation.valid);
});

// Handle phone validation
phoneInput.addEventListener('blur', function() {
    const validation = validatePhone(this.value);
    const errorEl = errors.phone;
    
    errorEl.textContent = validation.message;
    updateFieldVisuals(this, validation.valid);
});

// Handle password validation with real-time hints
passwordInput.addEventListener('input', function() {
    const value = this.value;

    // Update hints in real-time
    if (validators.uppercase.test(value)) {
        hints.upper.textContent = '✅ At least 1 uppercase letter (A-Z)';
        hints.upper.classList.add('met');
    } else {
        hints.upper.textContent = '✗ At least 1 uppercase letter (A-Z)';
        hints.upper.classList.remove('met');
    }

    if (validators.number.test(value)) {
        hints.number.textContent = '✅ At least 1 number (0-9)';
        hints.number.classList.add('met');
    } else {
        hints.number.textContent = '✗ At least 1 number (0-9)';
        hints.number.classList.remove('met');
    }

    if (validators.special.test(value)) {
        hints.special.textContent = '✅ At least 1 special character (!@#$%^&*)';
        hints.special.classList.add('met');
    } else {
        hints.special.textContent = '✗ At least 1 special character (!@#$%^&*)';
        hints.special.classList.remove('met');
    }
});

passwordInput.addEventListener('blur', function() {
    const validation = validatePassword(this.value);
    const errorEl = errors.password;
    
    errorEl.textContent = validation.message;
    updateFieldVisuals(this, validation.valid);
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const nameValidation = validateName(nameInput.value);
    const emailValidation = validateEmail(emailInput.value);
    const phoneValidation = validatePhone(phoneInput.value);
    const passwordValidation = validatePassword(passwordInput.value);

    errors.name.textContent = nameValidation.message;
    errors.email.textContent = emailValidation.message;
    errors.phone.textContent = phoneValidation.message;
    errors.password.textContent = passwordValidation.message;

    updateFieldVisuals(nameInput, nameValidation.valid);
    updateFieldVisuals(emailInput, emailValidation.valid);
    updateFieldVisuals(phoneInput, phoneValidation.valid);
    updateFieldVisuals(passwordInput, passwordValidation.valid);

    // If all valid, show success message
    if (nameValidation.valid && emailValidation.valid && phoneValidation.valid && passwordValidation.valid) {
        const successMsg = document.getElementById('successMessage');
        successMsg.innerHTML = `
            <div class="success-content">
                <h2>✅ Registration Successful!</h2>
                <p><strong>Name:</strong> ${nameInput.value}</p>
                <p><strong>Email:</strong> ${emailInput.value}</p>
                <p><strong>Phone:</strong> ${phoneInput.value}</p>
                <p>Your account has been created successfully. Check your email for verification link.</p>
                <button onclick="location.reload()">Register Another Student</button>
            </div>
        `;
        form.style.display = 'none';
    }
});
