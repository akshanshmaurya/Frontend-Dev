// ===== Q3: Math Utility Dashboard =====
console.log('\n===== Q3: Math Utility Dashboard =====');

const x = 16.75;

// Rounded value
const rounded = Math.round(x);

// Square root
const sqrtVal = Math.sqrt(x);

// Power (x^3)
const power3 = Math.pow(x, 3);

// Random number between 10 and 50 (inclusive)
const randomBetween10and50 = Math.floor(Math.random() * 41) + 10; // (0..40) + 10 => 10..50

// Formatted summary using template literals
const summary = `\nMath Utility Summary for x = ${x}\n` +
    `- Rounded value: ${rounded}\n` +
    `- Square root: ${sqrtVal.toFixed(4)}\n` +
    `- x ^ 3: ${power3.toFixed(4)}\n` +
    `- Random number (10-50): ${randomBetween10and50}\n`;

console.log(summary);

// Basic checks
console.assert(Number.isInteger(rounded), 'Rounded value must be integer');
console.assert(sqrtVal > 0, 'Sqrt should be positive');
console.assert(power3 > 0, 'Power should be positive');
console.log('Q3 assertions passed (if no assertion errors).\n');