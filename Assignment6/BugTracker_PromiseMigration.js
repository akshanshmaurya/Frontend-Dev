"use strict";

// Q3 - Bug Tracker: Callback -> Promise migration

// Original callback-style function (simulated)
function fetchBugsCallback(callback) {
  setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
}

// New Promise-based function getBugs() that simulates success/failure
function getBugs(simulateFailure = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // simulate random failure when simulateFailure === true or using Math.random
      const failed = simulateFailure || Math.random() < 0.2; // 20% fail rate by default
      if (failed) {
        reject(new Error('Failed to fetch bugs from server'));
      } else {
        resolve(["UI glitch", "API timeout", "Login failure"]);
      }
    }, 1000);
  });
}

// Demo using the callback version (for comparison)
if (typeof require !== 'undefined' && require.main === module) {
  console.log('\n--- Q3 Demo: Callback-based fetchBugs (old) ---');
  fetchBugsCallback((bugs) => {
    console.log('Callback got bugs:');
    console.table(bugs);
  });

  // Quickly demonstrate the Promise version
  setTimeout(() => {
    console.log('\n--- Q3 Demo: Promise-based getBugs ---');
    getBugs() // random failure possible
      .then(bugs => {
        console.table(bugs);
      })
      .catch(err => {
        console.error('Error fetching bugs:', err.message);
      });
  }, 1500);
}

// Export for testability
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchBugsCallback, getBugs };
}
