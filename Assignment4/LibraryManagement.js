// ===== Q3: Library Management System =====
// Book class with issue/return methods

'use strict';

// Notification system
function showNotification(message, type = 'info') {
    const notifEl = document.getElementById('notification');
    notifEl.textContent = message;
    notifEl.className = `notification show ${type}`;
    setTimeout(() => notifEl.classList.remove('show'), 3000);
}

// ===== BOOK CLASS =====
class Book {
    constructor(title, author, isbn, category) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.category = category;
        this.isIssued = false;
        this.issuedDate = null;
        this.issuedTo = null;
    }

    // Issue a book
    issueBook(patronName) {
        if (this.isIssued) {
            return { success: false, message: `Book "${this.title}" is already issued.` };
        }
        this.isIssued = true;
        this.issuedDate = new Date().toLocaleDateString();
        this.issuedTo = patronName;
        return { success: true, message: `Book "${this.title}" issued to ${patronName}.` };
    }

    // Return a book
    returnBook() {
        if (!this.isIssued) {
            return { success: false, message: `Book "${this.title}" was not issued.` };
        }
        const returnedTo = this.issuedTo;
        this.isIssued = false;
        this.issuedDate = null;
        this.issuedTo = null;
        return { success: true, message: `Book "${this.title}" returned (was issued to ${returnedTo}).` };
    }

    // Display book details
    getHTML() {
        const statusClass = this.isIssued ? 'issued' : 'available';
        const statusText = this.isIssued ? '✋ Issued' : '📖 Available';
        
        return `
            <div class="book-card ${statusClass}">
                <h3>${this.title}</h3>
                <p><strong>Author:</strong> ${this.author}</p>
                <p><strong>ISBN:</strong> ${this.isbn}</p>
                <p><strong>Category:</strong> ${this.category}</p>
                <p class="status"><strong>Status:</strong> ${statusText}</p>
                ${this.isIssued ? `<p class="issue-info">Issued to: <strong>${this.issuedTo}</strong> on ${this.issuedDate}</p>` : ''}
            </div>
        `;
    }
}

// ===== LIBRARY MANAGEMENT =====
let library = [];

// Load sample books
function loadSampleBooks() {
    library = [
        new Book('The Great Gatsby', 'F. Scott Fitzgerald', 'ISBN001', 'Fiction'),
        new Book('To Kill a Mockingbird', 'Harper Lee', 'ISBN002', 'Fiction'),
        new Book('1984', 'George Orwell', 'ISBN003', 'Fiction'),
        new Book('Pride and Prejudice', 'Jane Austen', 'ISBN004', 'Romance'),
        new Book('The Catcher in the Rye', 'J.D. Salinger', 'ISBN005', 'Fiction'),
        new Book('Sapiens', 'Yuval Noah Harari', 'ISBN006', 'Non-Fiction'),
        new Book('Atomic Habits', 'James Clear', 'ISBN007', 'Self-Help'),
        new Book('Python Basics', 'Author Unknown', 'ISBN008', 'Technology')
    ];

    // Issue some books by default
    library[0].issueBook('Aeshna Varshney');
    library[3].issueBook('Raj Kumar');

    showNotification('✅ Sample books loaded successfully!', 'success');
    displayBooks();
    updateStats();
    console.log('Loaded', library.length, 'sample books');
}

// Search book by ISBN
function findBookByISBN(isbn) {
    return library.find(book => book.isbn === isbn);
}

// Search and issue book
function searchAndIssueBook() {
    const isbnInput = document.getElementById('isbnSearch');
    const isbn = isbnInput.value.trim();

    if (!isbn) {
        showNotification('❌ Please enter an ISBN', 'error');
        return;
    }

    const book = findBookByISBN(isbn);
    if (!book) {
        showNotification(`❌ Book with ISBN ${isbn} not found`, 'error');
        return;
    }

    const patronName = prompt('Enter patron name:');
    if (!patronName) return;

    const result = book.issueBook(patronName);
    showNotification(result.message, result.success ? 'success' : 'error');
    
    if (result.success) {
        isbnInput.value = '';
        displayBooks();
        updateStats();
    }
}

// Return book
function returnBook() {
    const returnInput = document.getElementById('returnIsbn');
    const isbn = returnInput.value.trim();

    if (!isbn) {
        showNotification('❌ Please enter an ISBN', 'error');
        return;
    }

    const book = findBookByISBN(isbn);
    if (!book) {
        showNotification(`❌ Book with ISBN ${isbn} not found`, 'error');
        return;
    }

    const result = book.returnBook();
    showNotification(result.message, result.success ? 'success' : 'error');
    
    if (result.success) {
        returnInput.value = '';
        displayBooks();
        updateStats();
    }
}

// Display books by category
function displayBooks() {
    const availableBooks = library.filter(b => !b.isIssued);
    const issuedBooks = library.filter(b => b.isIssued);

    // Available books
    const availableHTML = availableBooks.length > 0 
        ? availableBooks.map(b => b.getHTML()).join('')
        : '<p class="empty-state">No books available at the moment</p>';
    
    document.getElementById('availableContainer').innerHTML = availableHTML;

    // Issued books
    const issuedHTML = issuedBooks.length > 0 
        ? issuedBooks.map(b => b.getHTML()).join('')
        : '<p class="empty-state">No books currently issued</p>';
    
    document.getElementById('issuedContainer').innerHTML = issuedHTML;

    // All books
    const allHTML = library.map(b => b.getHTML()).join('');
    document.getElementById('allContainer').innerHTML = allHTML;
}

// Update statistics
function updateStats() {
    const total = library.length;
    const available = library.filter(b => !b.isIssued).length;
    const issued = library.filter(b => b.isIssued).length;

    const statsHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <h4>Total Books</h4>
                <p class="stat-number">${total}</p>
            </div>
            <div class="stat-card">
                <h4>Available</h4>
                <p class="stat-number available">${available}</p>
            </div>
            <div class="stat-card">
                <h4>Issued</h4>
                <p class="stat-number issued">${issued}</p>
            </div>
        </div>
    `;

    document.getElementById('statsContainer').innerHTML = statsHTML;
    console.log(`Library Stats: Total=${total}, Available=${available}, Issued=${issued}`);
}

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Initialize on load
window.addEventListener('load', function() {
    loadSampleBooks();
    console.log('📚 Library Management System initialized');
});
