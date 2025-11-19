// Q4: Academic Performance Evaluator
// Determine promotion status based on marks of five subjects.

const subjectMarks = [88, 79, 92, 81, 85]; // Update marks as needed

const totalMarks = subjectMarks.reduce((sum, mark) => sum + mark, 0);
const average = totalMarks / subjectMarks.length;
const percentage = average; // Each subject is out of 100, so average equals percentage

const hasFailedSubject = subjectMarks.some(mark => mark < 35);

let status;

if (hasFailedSubject) {
	status = "Detained";
} else if (percentage >= 85) {
	status = "Promoted with Distinction";
} else if (percentage >= 50) {
	status = "Promoted";
} else {
	status = "Detained";
}

console.log(`Average Marks: ${average.toFixed(2)}%`);
console.log(`Overall Percentage: ${percentage.toFixed(2)}%`);
console.log(`Result: ${status}`);