// ===== Q4: Custom Form Builder =====
// Dynamic form generator using FormBuilder class

'use strict';

// ===== FORMBUILDER CLASS =====
class FormBuilder {
    constructor(fields) {
        this.fields = fields;
        this.formElement = null;
        this.values = {};
    }

    // Build the form dynamically
    build(containerId) {
        const container = document.getElementById(containerId);
        
        // Create form element
        this.formElement = document.createElement('form');
        this.formElement.id = 'dynamicForm';
        this.formElement.className = 'dynamic-form';

        // Create form fields
        this.fields.forEach(field => {
            const fieldElement = this.createField(field);
            this.formElement.appendChild(fieldElement);
        });

        // Add submit button
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn btn-submit';
        submitBtn.textContent = 'Submit';
        this.formElement.appendChild(submitBtn);

        // Handle form submission
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        container.innerHTML = '';
        container.appendChild(this.formElement);

        console.log('✅ Form built with', this.fields.length, 'fields');
    }

    // Create individual form field
    createField(field) {
        const fieldContainer = document.createElement('div');
        fieldContainer.className = 'form-group';

        // Create label
        const label = document.createElement('label');
        label.setAttribute('for', field.name);
        label.textContent = field.label || field.name;
        fieldContainer.appendChild(label);

        // Create input based on type
        let input;
        
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = field.rows || 4;
        } else if (field.type === 'select') {
            input = document.createElement('select');
            if (field.options) {
                field.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option.value || option;
                    opt.textContent = option.label || option;
                    input.appendChild(opt);
                });
            }
        } else if (field.type === 'radio') {
            const radioContainer = document.createElement('div');
            radioContainer.className = 'radio-group';
            
            if (field.options) {
                field.options.forEach(option => {
                    const radioWrapper = document.createElement('div');
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = field.name;
                    radio.value = option.value || option;
                    radio.id = `${field.name}-${option.value || option}`;
                    
                    const radioLabel = document.createElement('label');
                    radioLabel.setAttribute('for', radio.id);
                    radioLabel.textContent = option.label || option;
                    
                    radioWrapper.appendChild(radio);
                    radioWrapper.appendChild(radioLabel);
                    radioContainer.appendChild(radioWrapper);
                });
            }
            fieldContainer.appendChild(radioContainer);
            input = null;
        } else if (field.type === 'checkbox') {
            input = document.createElement('input');
            input.type = 'checkbox';
        } else {
            input = document.createElement('input');
            input.type = field.type || 'text';
        }

        if (input) {
            input.id = field.name;
            input.name = field.name;
            input.placeholder = field.placeholder || '';
            input.required = field.required || false;
            input.className = 'form-input';
            
            if (field.value) {
                if (field.type === 'checkbox') {
                    input.checked = field.value;
                } else {
                    input.value = field.value;
                }
            }
            
            fieldContainer.appendChild(input);
        }

        // Add help text
        if (field.help) {
            const helpText = document.createElement('small');
            helpText.className = 'help-text';
            helpText.textContent = field.help;
            fieldContainer.appendChild(helpText);
        }

        return fieldContainer;
    }

    // Handle form submission
    handleSubmit() {
        this.values = this.getFormData();
        
        console.log('📋 Form Data:', this.values);
        
        // Display output
        const outputContainer = document.getElementById('outputContainer');
        outputContainer.innerHTML = `
            <pre class="json-output">${JSON.stringify(this.values, null, 2)}</pre>
            <div class="success-message">✅ Form submitted successfully!</div>
        `;

        // Optional: Reset form after brief delay
        setTimeout(() => {
            this.formElement.reset();
            outputContainer.innerHTML = '';
        }, 2000);
    }

    // Get form data as object
    getFormData() {
        const formData = new FormData(this.formElement);
        const data = {};

        formData.forEach((value, key) => {
            if (data[key]) {
                // Handle multiple values (checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        });

        return data;
    }
}

// ===== PREDEFINED FORM CONFIGURATIONS =====

function buildLoginForm() {
    const loginFields = [
        { type: 'email', name: 'email', label: 'Email Address', placeholder: 'you@example.com', required: true },
        { type: 'password', name: 'password', label: 'Password', placeholder: 'Enter password', required: true },
        { type: 'checkbox', name: 'remember', label: 'Remember me' }
    ];

    const formBuilder = new FormBuilder(loginFields);
    formBuilder.build('formContainer');
    console.log('📝 Login form built');
}

function buildContactForm() {
    const contactFields = [
        { type: 'text', name: 'fullname', label: 'Full Name', placeholder: 'John Doe', required: true },
        { type: 'email', name: 'email', label: 'Email', placeholder: 'john@example.com', required: true },
        { type: 'tel', name: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000' },
        { type: 'select', name: 'subject', label: 'Subject', required: true, options: [
            { value: '', label: 'Select a subject' },
            { value: 'general', label: 'General Inquiry' },
            { value: 'support', label: 'Support' },
            { value: 'feedback', label: 'Feedback' }
        ]},
        { type: 'textarea', name: 'message', label: 'Message', placeholder: 'Your message here...', rows: 5, required: true }
    ];

    const formBuilder = new FormBuilder(contactFields);
    formBuilder.build('formContainer');
    console.log('📧 Contact form built');
}

function buildSurveyForm() {
    const surveyFields = [
        { type: 'text', name: 'name', label: 'Name', required: true },
        { type: 'radio', name: 'satisfaction', label: 'How satisfied are you?', required: true, options: [
            { value: 'very-satisfied', label: 'Very Satisfied' },
            { value: 'satisfied', label: 'Satisfied' },
            { value: 'neutral', label: 'Neutral' },
            { value: 'dissatisfied', label: 'Dissatisfied' }
        ]},
        { type: 'checkbox', name: 'features', label: 'Which features do you use?', options: [
            { value: 'feature1', label: 'Feature 1' },
            { value: 'feature2', label: 'Feature 2' },
            { value: 'feature3', label: 'Feature 3' }
        ]},
        { type: 'select', name: 'frequency', label: 'How often do you use?', options: [
            { value: '', label: 'Select frequency' },
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' }
        ]},
        { type: 'textarea', name: 'comments', label: 'Additional Comments', placeholder: 'Share your thoughts...' }
    ];

    const formBuilder = new FormBuilder(surveyFields);
    formBuilder.build('formContainer');
    console.log('📊 Survey form built');
}

function clearForm() {
    document.getElementById('formContainer').innerHTML = '';
    document.getElementById('outputContainer').innerHTML = '';
    console.log('🗑️ Form cleared');
}

// Initialize on load
window.addEventListener('load', function() {
    console.log('🔧 Form Builder initialized');
    buildLoginForm(); // Load default form
});
