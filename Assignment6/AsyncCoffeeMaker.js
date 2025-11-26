"use strict";

// Q1 - The Startup Morning: Async Coffee Maker
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomDelay() {
  // between 1000 and 2000 ms
  return Math.floor(Math.random() * 1000) + 1000;
}

function mayFail(stepName, failureRate = 0.2) {
  // Randomly decide if this step fails
  const failed = Math.random() < failureRate;
  if (failed) {
    const err = new Error(`${stepName} failed`);
    err.step = stepName;
    throw err;
  }
  return true;
}

function boilWater() {
  return new Promise(async (resolve, reject) => {
    console.log('Boiling water...');
    try {
      await delay(randomDelay());
      mayFail('boilWater');
      console.log('Water boiled.');
      resolve('boiled water');
    } catch (err) {
      reject(err);
    }
  });
}

function brewCoffee() {
  return new Promise(async (resolve, reject) => {
    console.log('Brewing coffee...');
    try {
      await delay(randomDelay());
      mayFail('brewCoffee');
      console.log('Coffee brewed.');
      resolve('brewed coffee');
    } catch (err) {
      reject(err);
    }
  });
}

function pourIntoCup() {
  return new Promise(async (resolve, reject) => {
    console.log('Pouring into cup...');
    try {
      await delay(randomDelay());
      mayFail('pourIntoCup');
      console.log('Poured into cup.');
      resolve('coffee ready');
    } catch (err) {
      reject(err);
    }
  });
}

// Use Promise chaining (.then) as required
function makeCoffeeChain() {
  console.log('\n--- Making coffee (Promise chaining) ---');
  boilWater()
    .then(() => brewCoffee())
    .then(() => pourIntoCup())
    .then(() => console.log('\nCoffee ready for the team!'))
    .catch(err => {
      console.error('\nCoffee making failed!');
      console.error('Reason:', err && err.message);
    });
}

// Export and demo when run directly
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { boilWater, brewCoffee, pourIntoCup, makeCoffeeChain };
}

if (typeof require !== 'undefined' && require.main === module) {
  // Run a demonstration
  makeCoffeeChain();
}
