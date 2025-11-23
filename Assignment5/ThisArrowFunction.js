// Q3 - Arrow function `this` behavior and fix
'use strict';

console.log('\n--- Q3 Demo: Arrow function `this` behavior ---');

// Create an object with an arrow function method
const userWithArrow = {
    name: 'Amit',
    showName: () => {
        // Arrow functions do not have their own `this`; they use lexical `this` (from outer scope)
        // In Node/global strict mode, `this` is undefined at top level, so this.name is undefined.
        console.log('Using arrow function, this.name =', this && this.name);
    }
};

userWithArrow.showName();

console.log('\n// Explanation: In the arrow version, `this` is lexically bound.');
console.log('// At runtime `this` refers to module/global context, not the object, so `this.name` is undefined.\n');

// Fix using a normal function so that `this` refers to the calling object
const userFixed = {
    name: 'Amit',
    showName: function() {
        // A normal function invoked as a method has `this` bound to the object
        console.log('Using normal function, this.name =', this.name);
    }
};

userFixed.showName();

console.log('\n// Tip: Use arrow functions for inner callbacks where lexical `this` is desired, but use normal functions for object methods.\n');