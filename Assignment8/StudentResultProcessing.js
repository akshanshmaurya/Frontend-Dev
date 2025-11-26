"use strict";

// Q1 - Student Result Processing (reduce + Classes)

class Student {
  constructor(name, marks = []) {
    this.name = name;
    this.marks = marks; // array of numbers
  }

  // Calculate average using reduce
  calculateAverage() {
    if (!Array.isArray(this.marks) || this.marks.length === 0) return 0;
    const total = this.marks.reduce((acc, cur) => acc + cur, 0);
    return total / this.marks.length;
  }

  // Return grade based on average
  getGrade() {
    const avg = this.calculateAverage();
    if (avg >= 85) return 'A';
    if (avg >= 70) return 'B';
    if (avg >= 50) return 'C';
    return 'F';
  }

  // Helper to show summary
  summary() {
    const avg = this.calculateAverage();
    return {
      name: this.name,
      marks: this.marks,
      average: Number(avg.toFixed(2)),
      grade: this.getGrade()
    };
  }
}

// Demo / Tests — create 3 students and print results
if (typeof require !== 'undefined' && require.main === module) {
  console.log('\n--- Q1: Student Result Processing Demo ---');

  const students = [
    new Student('Aisha', [92, 88, 95, 90]), // high avg -> A
    new Student('Vikram', [70, 65, 72, 68]), // around 68.75 -> B
    new Student('Mona', [45, 50, 42, 38]) // low -> F
  ];

  students.forEach(s => console.table(s.summary()));
}

if (typeof module !== 'undefined' && module.exports) module.exports = { Student };