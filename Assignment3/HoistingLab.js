'use strict';

// ===== Q5: HOISTING LAB =====
console.log('\n===== Q5: HOISTING LAB =====\n');

console.log('===== PART 1: ORIGINAL CODE (PROBLEMATIC) =====\n');

console.log(`Original code:
console.log(score);           // undefined (hoisted but not initialized)
announce();                   // "Game started" (function hoisting)
var score = 50;               // initialization happens here
function announce() {
    console.log("Game started");
}
let status = "ready";         // let NOT hoisted (TDZ)
startGame();                  // ReferenceError: cannot access status before initialization
function startGame() {
    console.log(status);
}
`);

console.log('\nPROBLEM: startGame() tries to access "status" before it\'s initialized.');
console.log('In JavaScript:');
console.log('  - var declarations are hoisted and initialized as undefined');
console.log('  - let/const are hoisted but NOT initialized (Temporal Dead Zone)');
console.log('  - Functions are fully hoisted');
console.log('');

console.log('===== PART 2: EXECUTION TRACE (HOW JS SEES IT) =====\n');

console.log('Memory state after parsing (but before execution):');
console.log(`
  ┌─ GLOBAL SCOPE ─────────────────┐
  │ var score = undefined           │ (hoisted, not initialized)
  │ function announce() { ... }     │ (fully hoisted)
  │ let status = <not initialized>  │ (in Temporal Dead Zone)
  │ function startGame() { ... }    │ (fully hoisted)
  └─────────────────────────────────┘
`);

console.log('\nExecution order:');
console.log('1. console.log(score) → undefined (var is hoisted)');
console.log('2. announce() → "Game started" (function is hoisted)');
console.log('3. score = 50 → initialization');
console.log('4. startGame() → ERROR because let status is still in TDZ\n');

console.log('===== PART 3: FIXED VERSION (WORKING) =====\n');

// FIXED: Move let declaration before use
const score = 50;
const status = "ready"; // Now declared BEFORE startGame() is called

function announce() {
    console.log("✓ Game started");
}

function startGame() {
    console.log(`✓ Status: ${status}`);
}

console.log('Fixed code execution:');
console.log(`score: ${score}`);
announce();
startGame();

console.log('\n===== PART 4: COMPARISON WITH ARROW FUNCTIONS =====\n');

console.log('Arrow functions DO NOT hoist the same way as regular functions.');
console.log('');

// HOISTED: Regular function
function regularFunc() {
    return "Regular function (hoisted)";
}

// NOT HOISTED: Arrow function assigned to const
const arrowFunc = () => {
    return "Arrow function (not hoisted)";
};

// NOT HOISTED: Arrow function assigned to var (hoisted as undefined)
var arrowFuncVar = () => {
    return "Arrow function with var (var hoisted, function not)";
};

console.log('Hoisting comparison:');
console.log('1. regularFunc() called before declaration:');
try {
    // This would work if we tried to call it before declaration
    // because regular functions are fully hoisted
    console.log(`   ✓ Would work (function is hoisted)`);
} catch (e) {
    console.log(`   ❌ Error: ${e.message}`);
}

console.log('\n2. arrowFunc() called before declaration would fail:');
console.log('   (Arrow functions are NOT hoisted)');

console.log('\n3. arrowFuncVar called before declaration:');
console.log('   var is hoisted as undefined, so function is not yet defined');

// Now call them after they're defined
console.log('\nAfter declaration:');
console.log(`  regularFunc(): ${regularFunc()}`);
console.log(`  arrowFunc(): ${arrowFunc()}`);
console.log(`  arrowFuncVar(): ${arrowFuncVar()}`);

console.log('\n===== PART 5: BEST PRACTICES TO AVOID HOISTING CONFUSION =====\n');

// BEST PRACTICE 1: Use const/let instead of var
console.log('Best Practice 1: Use const/let (not var)');
const bestScore = 100;
console.log(`  const bestScore = ${bestScore}; ✓`);

// BEST PRACTICE 2: Declare before use
console.log('\nBest Practice 2: Declare before use');
const userName = "Alice";
console.log(`  User: ${userName} ✓`);

// BEST PRACTICE 3: Use arrow functions with const
console.log('\nBest Practice 3: Use arrow functions with const');
const greet = (name) => `Hello, ${name}!`;
console.log(`  ${greet("Bob")} ✓`);

// BEST PRACTICE 4: Avoid global scope
console.log('\nBest Practice 4: Keep variables in smallest scope');
function scopedExample() {
    const localVar = "local";
    console.log(`  Inside function: ${localVar} ✓`);
}
scopedExample();

console.log('\n===== PART 6: HOISTING MEMORY DIAGRAM =====\n');

console.log(`
VAR HOISTING:
  Phase 1 (Parse):  var x = <undefined>
  Phase 2 (Execute): x = 10
  
LET/CONST HOISTING (TDZ - Temporal Dead Zone):
  Phase 1 (Parse):  let y ← TDZ ZONE (not initialized)
  Phase 2 (Execute): y = 20  ← exits TDZ, now initialized
  
FUNCTION HOISTING:
  Phase 1 (Parse):  function f() { ... } (entire function available)
  Phase 2 (Execute): function call works immediately
  
ARROW FUNCTION:
  Phase 1 (Parse):  const f = <not hoisted>
  Phase 2 (Execute): const f = () => { ... } (only after assignment)
`);

console.log('\n===== PART 7: PRACTICAL IMPLICATIONS =====\n');

// Example 1: Why var is problematic
console.log('Example 1: var scope issues (avoid this)');
function varProblem() {
    if (true) {
        var x = 10; // function-scoped, not block-scoped
    }
    console.log(`  x outside block (with var): ${x} ✓ (unexpected!)`);
}
varProblem();

// Example 2: let prevents this
console.log('\nExample 2: let prevents scope bleeding (use this)');
function letSolution() {
    if (true) {
        let y = 10; // block-scoped
    }
    try {
        console.log(`  y outside block (with let): ${y}`);
    } catch (e) {
        console.log(`  y outside block (with let): ReferenceError ✓ (correct!)`);
    }
}
letSolution();

console.log('\n===== SUMMARY =====\n');
console.log(`
HOISTING RULES:
1. var: Hoisted with undefined initialization
2. let/const: Hoisted but in Temporal Dead Zone (not accessible)
3. Functions: Fully hoisted (accessible before declaration)
4. Arrow functions: NOT hoisted (follow const/let rules)

KEY TAKEAWAY: Use const/let and declare variables before use to avoid confusion.
`);

