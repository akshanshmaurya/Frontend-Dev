// ===== Q5: Movie Ticket Booking =====
// Form validation using RegExp and object storage

'use strict';

// Regular expressions for validation
const nameRegex = /^[a-zA-Z\s]+$/; // Only alphabets and spaces
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format

// Ticket class
class MovieTicket {
    constructor(name, email, seats, movie) {
        this.bookingId = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
        this.name = name;
        this.email = email;
        this.seats = seats;
        this.movie = movie;
        this.bookingDate = new Date().toLocaleDateString();
        this.bookingTime = new Date().toLocaleTimeString();
        this.ticketPrice = this.calculatePrice(movie);
        this.totalAmount = this.ticketPrice * seats;
    }

    calculatePrice(movie) {
        const prices = {
            'Dune 2': 300,
            'Avatar 3': 350,
            'Oppenheimer': 250,
            'Asteroid City': 280
        };
        return prices[movie] || 250;
    }

    getTicketHTML() {
        return `
            <div class="ticket-card">
                <div class="ticket-header">
                    <h3>🎟️ Movie Ticket Confirmation</h3>
                    <p class="booking-id">Booking ID: <strong>${this.bookingId}</strong></p>
                </div>

                <div class="ticket-content">
                    <div class="ticket-section">
                        <h4>Passenger Information</h4>
                        <p><strong>Name:</strong> ${this.name}</p>
                        <p><strong>Email:</strong> ${this.email}</p>
                    </div>

                    <div class="ticket-section">
                        <h4>Movie Details</h4>
                        <p><strong>Movie:</strong> ${this.movie}</p>
                        <p><strong>Number of Seats:</strong> ${this.seats}</p>
                        <p><strong>Price per Seat:</strong> ₹${this.ticketPrice}</p>
                    </div>

                    <div class="ticket-section">
                        <h4>Booking Information</h4>
                        <p><strong>Booking Date:</strong> ${this.bookingDate}</p>
                        <p><strong>Booking Time:</strong> ${this.bookingTime}</p>
                    </div>

                    <div class="ticket-footer">
                        <p class="total"><strong>Total Amount:</strong> ₹${this.totalAmount}</p>
                        <p class="status">✅ Booking Confirmed</p>
                    </div>
                </div>

                <div class="ticket-actions">
                    <button onclick="downloadTicket('${this.bookingId}')" class="btn-action">📥 Download</button>
                    <button onclick="printTicket('${this.bookingId}')" class="btn-action">🖨️ Print</button>
                    <button onclick="resetForm()" class="btn-action btn-new">➕ Book Another</button>
                </div>
            </div>
        `;
    }
}

// Form elements
const form = document.getElementById('bookingForm');
const nameInput = document.getElementById('userName');
const emailInput = document.getElementById('userEmail');
const seatsInput = document.getElementById('seatCount');
const movieSelect = document.getElementById('movieSelect');

// Error elements
const errors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    seats: document.getElementById('seatsError')
};

// Validation functions
function validateName(value) {
    if (!value.trim()) {
        return { valid: false, message: '❌ Name is required' };
    }
    if (!nameRegex.test(value)) {
        return { valid: false, message: '❌ Name must contain only alphabets' };
    }
    if (value.trim().length < 3) {
        return { valid: false, message: '❌ Name must be at least 3 characters' };
    }
    return { valid: true, message: '✅ Name is valid' };
}

function validateEmail(value) {
    if (!value.trim()) {
        return { valid: false, message: '❌ Email is required' };
    }
    if (!emailRegex.test(value)) {
        return { valid: false, message: '❌ Invalid email format' };
    }
    return { valid: true, message: '✅ Email is valid' };
}

function validateSeats(value) {
    const seats = parseInt(value);
    if (!value) {
        return { valid: false, message: '❌ Seat count is required' };
    }
    if (isNaN(seats) || seats < 1 || seats > 10) {
        return { valid: false, message: '❌ Seats must be between 1 and 10' };
    }
    return { valid: true, message: `✅ ${seats} seat(s) selected` };
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

// Validation listeners
nameInput.addEventListener('blur', function() {
    const validation = validateName(this.value);
    errors.name.textContent = validation.message;
    updateFieldVisuals(this, validation.valid);
});

emailInput.addEventListener('blur', function() {
    const validation = validateEmail(this.value);
    errors.email.textContent = validation.message;
    updateFieldVisuals(this, validation.valid);
});

seatsInput.addEventListener('blur', function() {
    const validation = validateSeats(this.value);
    errors.seats.textContent = validation.message;
    updateFieldVisuals(this, validation.valid);
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const nameValidation = validateName(nameInput.value);
    const emailValidation = validateEmail(emailInput.value);
    const seatsValidation = validateSeats(seatsInput.value);

    errors.name.textContent = nameValidation.message;
    errors.email.textContent = emailValidation.message;
    errors.seats.textContent = seatsValidation.message;

    updateFieldVisuals(nameInput, nameValidation.valid);
    updateFieldVisuals(emailInput, emailValidation.valid);
    updateFieldVisuals(seatsInput, seatsValidation.valid);

    // Check if movie is selected
    if (!movieSelect.value) {
        alert('❌ Please select a movie');
        return;
    }

    // If all validations pass
    if (nameValidation.valid && emailValidation.valid && seatsValidation.valid) {
        // Create booking object
        const booking = {
            name: nameInput.value,
            email: emailInput.value,
            seats: parseInt(seatsInput.value),
            movie: movieSelect.value.split(' - ')[0] // Extract movie name
        };

        // Create ticket
        const ticket = new MovieTicket(booking.name, booking.email, booking.seats, booking.movie);

        // Display ticket
        document.getElementById('ticketContainer').innerHTML = ticket.getTicketHTML();

        // Log booking info
        console.log('🎟️ Booking confirmed:', booking);
        console.log('Ticket details:', ticket);

        // Hide form
        form.style.display = 'none';
    }
});

// Helper functions
function downloadTicket(bookingId) {
    alert(`📥 Downloading ticket ${bookingId}...\n(Feature simulation)`)
    console.log('Downloading ticket:', bookingId);
}

function printTicket(bookingId) {
    window.print();
    console.log('Printing ticket:', bookingId);
}

function resetForm() {
    form.reset();
    form.style.display = 'block';
    document.getElementById('ticketContainer').innerHTML = '';
    errors.name.textContent = '';
    errors.email.textContent = '';
    errors.seats.textContent = '';
    nameInput.classList.remove('valid', 'invalid');
    emailInput.classList.remove('valid', 'invalid');
    seatsInput.classList.remove('valid', 'invalid');
    nameInput.focus();
    console.log('🔄 Form reset');
}

// Initialize
window.addEventListener('load', function() {
    console.log('🎬 Movie Ticket Booking System initialized');
});
