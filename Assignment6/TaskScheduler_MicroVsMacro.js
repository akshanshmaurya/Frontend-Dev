"use strict";

// Q2 - Task Scheduler: Micro vs Macro Challenge
console.log('\n--- Q2 Demo: Microtask vs Macrotask ---');
console.log('Start');

// macrotask
setTimeout(() => {
  console.log('setTimeout (macrotask) executed');
}, 0);

// microtask
Promise.resolve().then(() => {
  console.log('Promise.then (microtask) executed');
});

// some synchronous log
console.log('Synchronous log in between');

console.log('End');

/*
Expected output order:
1. Start
2. Synchronous log in between
3. End
4. Promise.then (microtask) executed
5. setTimeout (macrotask) executed

Explanation:
- Synchronous code runs first in the call stack.
- After the stack is empty, the microtask queue is processed (Promise callbacks, mutation observers, process.nextTick in Node). Microtasks run before macrotasks.
- Only after all microtasks are drained will the event loop handle the macrotask queue (e.g., setTimeout callbacks).

This behavior ensures fast follow-up tasks scheduled with microtasks run before yielding back to the browser/event loop.
*/

// Export nothing; this example is meant to be run directly
if (typeof require !== 'undefined' && require.main === module) {
  // Run implicitly when executed with node
}
