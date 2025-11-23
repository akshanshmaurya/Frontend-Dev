// Q6 - Prototype chain: Person -> Faculty -> Professor
'use strict';

// Person constructor
function Person(name) {
    this.name = name;
}
Person.prototype.greet = function() {
    console.log(`Hello, I am ${this.name} (Person).`);
};

// Faculty constructor
function Faculty(name, department) {
    Person.call(this, name);
    this.department = department;
}
// Inherit from Person
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;
Faculty.prototype.teach = function() {
    console.log(`${this.name} teaches in ${this.department} department.`);
};

// Professor constructor
function Professor(name, department, title) {
    Faculty.call(this, name, department);
    this.title = title; // e.g., 'Associate Professor'
}
// Inherit from Faculty
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.research = function(topic) {
    console.log(`${this.title} ${this.name} researches on ${topic}.`);
};

// Demonstration
console.log('\n--- Q6 Demo: Person -> Faculty -> Professor prototype chain ---');
const prof = new Professor('Dr. Kiran', 'Computer Science', 'Associate Professor');

// Professor can access methods from all levels
prof.greet();        // Person.prototype
prof.teach();        // Faculty.prototype
prof.research('AI'); // Professor.prototype

// Show prototype links
console.log('\n// Prototype chain:');
console.log('prof instanceof Professor =>', prof instanceof Professor);
console.log('prof instanceof Faculty =>', prof instanceof Faculty);
console.log('prof instanceof Person =>', prof instanceof Person);
console.log();
