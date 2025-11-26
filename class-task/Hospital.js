"use strict";
// Helper: returns a promise that resolves after a random delay between min and max ms
function randomDelay(min = 1000, max = 2000) {
	const ms = Math.floor(Math.random() * (max - min + 1)) + min;
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulate an individual step. It waits a random delay and then either resolves or rejects.
// failureRate is a number between 0 and 1 indicating probability of failure.
async function simulateStep(stepName, failureRate = 0.25) {
	console.log(`→ Starting: ${stepName}...`);
	await randomDelay(1000, 2000);

	// Determine random failure
	const failed = Math.random() < failureRate;
	if (failed) {
		console.error(`✖ Step failed: ${stepName}`);
		// throw an Error to stop the workflow
		throw new Error(`${stepName} failed`);
	}

	console.log(`✔ Completed: ${stepName}`);
	return `${stepName} done`;
}

// Orchestrator: runs all steps sequentially and handles failures
async function handleEmergency(patientName = 'Unknown') {
	console.log(`\n=== Emergency handling started for: ${patientName} ===`);
	try {
		await simulateStep('registerPatient');
		await simulateStep('assignDoctor');
		await simulateStep('startDiagnosis');
		await simulateStep('startTreatment');

		// All steps succeeded
		console.log('\nPatient is treated successfully!');
	} catch (err) {
		// Any failure lands here — stop the process
		console.error('\nEmergency handling failed!');
		// Optionally log the error message for debugging
		console.error('Reason:', err.message);
	}
	console.log(`=== Emergency handling ended for: ${patientName} ===\n`);
}

// If this file is run directly with Node.js, run a demonstration
if (typeof require !== 'undefined' && require.main === module) {
	// Run a few demo patients to show success and failure cases
	(async () => {
		await handleEmergency('Patient A');
		// small delay between runs
		await randomDelay(500, 800);
		await handleEmergency('Patient B');
	})();
}

// Export for use in other modules (optional)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { handleEmergency, simulateStep };
}

