"use strict";

// Q5 - Frontend Rush: Avoiding Callback Hell

function delayMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Callback style (nested) - intentionally messy to illustrate callback hell
function pipelineWithCallbacks(callback) {
  console.log('\n--- Q5 Demo: Callback hell version ---');
  setTimeout(() => {
    console.log('design completed');
    setTimeout(() => {
      console.log('build completed');
      setTimeout(() => {
        console.log('test completed');
        setTimeout(() => {
          console.log('deploy completed');
          setTimeout(() => {
            console.log('celebrate 🎉 - pipeline finished');
            if (typeof callback === 'function') callback();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

// Async/await version using promises for readability
async function stage(name) {
  await delayMs(1000);
  console.log(`${name} completed`);
  return name;
}

async function pipelineAsyncAwait() {
  console.log('\n--- Q5 Demo: Async/Await version ---');
  try {
    await stage('design');
    await stage('build');
    await stage('test');
    await stage('deploy');
    await stage('celebrate 🎉 - pipeline finished');
  } catch (err) {
    console.error('Pipeline failed:', err.message);
  }
}

// Demonstration when run directly
if (typeof require !== 'undefined' && require.main === module) {
  // Show callback hell first
  pipelineWithCallbacks(() => {
    // after callback version finishes, run async/await version
    setTimeout(() => pipelineAsyncAwait(), 500);
  });
}

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { pipelineWithCallbacks, pipelineAsyncAwait };
}
