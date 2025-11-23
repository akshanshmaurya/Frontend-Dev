// Q1 - Callbacks: greetUser(name, callback)
'use strict';

// Callback that prints the end message
function showEndMessage() {
    console.log('Welcome to the course!');
}

// greetUser prints greeting then executes the provided callback
function greetUser(name, callback) {
    console.log(`Hello ${name}`);

    // Demonstrate callback flow by calling the callback right after
    // This ensures the callback runs only after the greeting is printed.
    if (typeof callback === 'function') {
        callback();
    } else {
        console.log('No callback provided.');
    }
}

// Demonstration 1: pass named function
console.log('\n--- Q1 Demo: Named callback ---');
greetUser('Aeshna', showEndMessage);

// Demonstration 2: pass anonymous callback (inline)
console.log('\n--- Q1 Demo: Anonymous callback ---');
greetUser('Ravi', function() {
    console.log('You have successfully joined the course (anonymous callback).');
});

// Demonstration 3: asynchronous callback example to show order
console.log('\n--- Q1 Demo: Async style callback (setTimeout) ---');
function asyncEndMessage() {
    setTimeout(() => console.log('Async: Welcome to the course!'), 0);
}
greetUser('Maya', asyncEndMessage);

// Explanation (console output acts as the demonstration):
console.log('\n// Explanation: greetUser prints greeting synchronously, then invokes the callback.');
console.log('// If callback contains asynchronous code (e.g., setTimeout), its inner work may execute later.\n');