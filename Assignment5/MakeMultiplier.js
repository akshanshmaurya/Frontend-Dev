// Q7 - Closures: makeMultiplier
'use strict';

function makeMultiplier(multiplier) {
    // multiplier is captured by the returned function (closure)
    return function(number) {
        return number * multiplier;
    };
}

// Demo
console.log('\n--- Q7 Demo: makeMultiplier closure ---');
const triple = makeMultiplier(3);
console.log('triple(5) =>', triple(5)); // 15

const double = makeMultiplier(2);
console.log('double(8) =>', double(8)); // 16

// Explanation:
console.log('\n// Explanation:');
console.log('// makeMultiplier returns an inner function that "closes over" the multiplier variable.');
console.log('// Even after makeMultiplier finishes, the returned function retains access to multiplier.');
console.log('// That retained reference is called a closure.\n');