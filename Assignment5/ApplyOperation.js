// Q2 - Higher-order function applyOperation(numbers, operation)
'use strict';

// applyOperation takes an array and a callback operation and returns a new array
function applyOperation(numbers, operation) {
    if (!Array.isArray(numbers)) throw new TypeError('numbers must be an array');
    if (typeof operation !== 'function') throw new TypeError('operation must be a function');

    const result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(operation(numbers[i], i, numbers));
    }
    return result;
}

// Test arrays
const baseArray = [1, 2, 3, 4];

// Double each number
const doubled = applyOperation(baseArray, num => num * 2);
console.log('\n--- Q2 Demo: Double each number ---');
console.log('Input:', baseArray);
console.log('Doubled:', doubled);

// Square each number
const squared = applyOperation(baseArray, num => num * num);
console.log('\n--- Q2 Demo: Square each number ---');
console.log('Input:', baseArray);
console.log('Squared:', squared);

// Explanation: applyOperation acts like Array.prototype.map but demonstrates passing a callback explicitly.
console.log('\n// Explanation: applyOperation receives an operation callback and applies it to each element.\n');