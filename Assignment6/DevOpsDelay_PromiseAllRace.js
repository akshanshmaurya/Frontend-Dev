"use strict";

// Q4 - DevOps Delay: Async Timeout Race

function serverResponse(name, delayMs, failureRate = 0.15) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const failed = Math.random() < failureRate; // simulate random failure
      if (failed) {
        reject(new Error(`${name} failed to respond`));
      } else {
        resolve({ server: name, time: delayMs, status: 'ok' });
      }
    }, delayMs);
  });
}

function runDeploySimulation() {
  console.log('\n--- Q4 Demo: Promise.all & Promise.race ---');

  const serverA = serverResponse('Server A', 2000);
  const serverB = serverResponse('Server B', 3000);

  // Promise.all: wait for both to complete (or reject if any fails)
  Promise.all([serverA, serverB])
    .then(results => {
      console.log('Deployment completed for all servers');
      console.table(results);
    })
    .catch(err => {
      console.error('Deployment error (Promise.all):', err.message);
    });

  // Promise.race: first to complete (resolve or reject) wins
  Promise.race([serverA, serverB])
    .then(fastest => {
      console.log('Fastest response:', fastest.server, `(responded in ${fastest.time}ms)`);
    })
    .catch(err => {
      console.error('Deployment race error (Promise.race):', err.message);
    });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { serverResponse, runDeploySimulation };
}

if (typeof require !== 'undefined' && require.main === module) {
  runDeploySimulation();
}
