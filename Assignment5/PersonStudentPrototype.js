// Q5 - Person and Student constructor functions with prototype inheritance
'use strict';

// Person constructor
function Person(name) {
    this.name = name;
}

Person.prototype.printName = function() {
    console.log(`Name: ${this.name}`);
};

// Student constructor inherits from Person
function Student(name, branch) {
    // Call Person constructor to initialize name
    Person.call(this, name);
    this.branch = branch;
}

// Set up prototype chain
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// Add method to Student prototype
Student.prototype.printBranch = function() {
    console.log(`Branch: ${this.branch}`);
};

// Demonstration
console.log('\n--- Q5 Demo: Person -> Student prototype inheritance ---');
const student1 = new Student('Sara', 'Computer Science');
student1.printName();    // from Person.prototype
student1.printBranch();  // from Student.prototype

// Show prototype chain
console.log('\n// Prototype chain check:');
console.log('student1 instanceof Student =>', student1 instanceof Student);
console.log('student1 instanceof Person =>', student1 instanceof Person);
console.log('Prototype of student1:', Object.getPrototypeOf(student1));
console.log('Prototype of Student.prototype:', Object.getPrototypeOf(Student.prototype));
console.log();
