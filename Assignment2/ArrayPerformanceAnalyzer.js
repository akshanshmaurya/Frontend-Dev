// ===== Q4: Array Performance Analyzer =====
console.log('\n===== Q4: Array Performance Analyzer =====');

// Helper to generate random integer between min and max (inclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 8 random scores
const scores = Array.from({ length: 8 }, () => randInt(30, 100));
console.log('Scores:', scores);

// Highest and lowest
const highest = Math.max(...scores);
const lowest = Math.min(...scores);

// Average
const total = scores.reduce((acc, s) => acc + s, 0);
const average = total / scores.length;

// Number of students who passed (>= 50)
const passed = scores.filter(s => s >= 50).length;

// Optional: Get sorted list and distribution
const sortedScores = [...scores].sort((a, b) => b - a);
const distribution = scores.reduce((acc, s) => {
    const bucket = Math.floor(s / 10) * 10; // e.g., 83 -> 80
    acc[bucket] = (acc[bucket] || 0) + 1;
    return acc;
}, {});

// Display summary
console.log('\n===== Performance Summary =====');
console.log(`Number of Students: ${scores.length}`);
console.log(`Highest Score: ${highest}`);
console.log(`Lowest Score: ${lowest}`);
console.log(`Average Score: ${average.toFixed(2)}`);
console.log(`Students Passed (>=50): ${passed}`);
console.log('\nSorted Scores (desc):', sortedScores);
console.log('\nScore Distribution (bucket -> count):');
console.table(distribution);

// Formatted report object
const report = {
    'Total Students': scores.length,
    'Scores': scores.join(', '),
    'Highest': highest,
    'Lowest': lowest,
    'Average': average.toFixed(2),
    'Passed Count': passed
};

console.log('\n===== Report Table =====');
console.table(report);

// Basic tests
console.assert(scores.length === 8, 'There must be 8 scores');
console.assert(highest >= lowest, 'Highest must be >= lowest');
console.log('Q4 assertions passed (if no assertion errors).\n');