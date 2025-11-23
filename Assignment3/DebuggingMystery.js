'use strict';

// ===== Q4: DEBUGGING MYSTERY =====
console.log('\n===== Q4: DEBUGGING MYSTERY =====\n');

// EXPLANATION OF THE PROBLEM:
console.log('PROBLEM CODE (COMMENTED OUT - Would throw error):');
console.log(`
    "use strict";
    function showMessage() {
        greeting = "Welcome";  // ❌ UNDECLARED VARIABLE
        console.log(greeting);
    }
    showMessage();
`);

console.log('\nWHY IT FAILS:');
console.log(`
In STRICT MODE:
- Assigning to an undeclared variable throws a ReferenceError.
- Without strict mode: undeclared variable creates a global variable (implicit global).
- With strict mode: undeclared variable is forbidden (safer code).
`);

console.log('\nSOLUTION 1: Declare variable with let/const/var\n');

// FIXED VERSION 1: Using let
function showMessageFixed1() {
    let greeting = "Welcome"; // ✓ DECLARED with let
    console.log(greeting);
}

console.log('Calling showMessageFixed1():');
showMessageFixed1();

console.log('\n\nSOLUTION 2: Declare as global variable\n');

// FIXED VERSION 2: Declare global first
let globalGreeting = "Welcome";

function showMessageFixed2() {
    globalGreeting = "Welcome"; // ✓ Reassigning declared global
    console.log(globalGreeting);
}

console.log('Calling showMessageFixed2():');
showMessageFixed2();

console.log('\n\nSOLUTION 3: Pass as parameter\n');

// FIXED VERSION 3: Use parameter
function showMessageFixed3(greeting) {
    console.log(greeting);
}

console.log('Calling showMessageFixed3("Welcome"):');
showMessageFixed3("Welcome");

// DEBUGGING DEMONSTRATION
console.log('\n\n===== DEBUGGING TECHNIQUES =====\n');

// Technique 1: Watch variables
console.log('Technique 1: Watch variable state');
function demoWatchVariable() {
    let counter = 0;
    console.log(`  Before loop: counter = ${counter}`);
    
    for (let i = 0; i < 3; i++) {
        counter++;
        console.log(`  Loop iteration ${i}: counter = ${counter}`);
    }
    
    console.log(`  After loop: counter = ${counter}`);
    return counter;
}

demoWatchVariable();

// Technique 2: Call stack observation
console.log('\n\nTechnique 2: Function call stack');
function level1() {
    console.log('  [Level 1] Function called');
    level2();
    console.log('  [Level 1] Returning to caller');
}

function level2() {
    console.log('    [Level 2] Function called');
    level3();
    console.log('    [Level 2] Returning to caller');
}

function level3() {
    console.log('      [Level 3] Function called (deepest level)');
}

console.log('Call stack simulation:');
level1();

// Technique 3: Breakpoint simulation with logging
console.log('\n\nTechnique 3: Breakpoint simulation (logging key states)');
function calculationWithDebug(a, b) {
    console.log(`  [Breakpoint 1] a = ${a}, b = ${b}`);
    
    const sum = a + b;
    console.log(`  [Breakpoint 2] sum = ${sum}`);
    
    const product = a * b;
    console.log(`  [Breakpoint 3] product = ${product}`);
    
    const result = sum + product;
    console.log(`  [Breakpoint 4] result = ${result}`);
    
    return result;
}

console.log('Running calculationWithDebug(3, 4):');
const debugResult = calculationWithDebug(3, 4);

// Technique 4: Scope inspection
console.log('\n\nTechnique 4: Inspecting scope with typeof');
function scopeInspection() {
    let localVar = 10;
    
    console.log(`  typeof localVar = "${typeof localVar}" (declared in function)`);
    console.log(`  typeof globalGreeting = "${typeof globalGreeting}" (declared globally)`);
    console.log(`  typeof undeclaredVar = "${typeof undeclaredVar}" (not declared)`);
    
    // In strict mode, accessing undeclaredVar directly would throw ReferenceError
    // but typeof undeclaredVar returns "undefined" safely
}

scopeInspection();

console.log('\n\n===== KEY TAKEAWAYS =====');
console.log(`
1. STRICT MODE enforces variable declaration
2. Without strict mode: undeclared vars become global (dangerous)
3. With strict mode: undeclared vars throw ReferenceError (safer)
4. Always use 'let', 'const', or 'var' to declare variables
5. Debugging tools:
   - console.log() for state inspection
   - Function call tracing
   - Breakpoint simulation with strategic logging
   - typeof operator for safe type checking
`);

