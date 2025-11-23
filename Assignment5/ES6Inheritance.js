// Q9 - ES6 classes: Person -> Student using extends and super()
'use strict';

// ES6 class version
class PersonClass {
    constructor(name) {
        this.name = name;
    }

    printName() {
        console.log(`(class) Name: ${this.name}`);
    }
}

class StudentClass extends PersonClass {
    constructor(name, branch) {
        super(name);
        this.branch = branch;
    }

    printBranch() {
        console.log(`(class) Branch: ${this.branch}`);
    }
}

// Demo ES6 classes
console.log('\n--- Q9 Demo: ES6 class inheritance ---');
const studentClass = new StudentClass('Neha', 'Electronics');
studentClass.printName();
studentClass.printBranch();

// For comparison: prototype version from Q5
console.log('\n--- Q9 Comparison: Prototype version result (reusing Q5 pattern) ---');

function PersonProto(name) { this.name = name; }
PersonProto.prototype.printName = function() { console.log(`(proto) Name: ${this.name}`); };

function StudentProto(name, branch) {
    PersonProto.call(this, name);
    this.branch = branch;
}
StudentProto.prototype = Object.create(PersonProto.prototype);
StudentProto.prototype.constructor = StudentProto;
StudentProto.prototype.printBranch = function() { console.log(`(proto) Branch: ${this.branch}`); };

const studentProto = new StudentProto('Neha', 'Electronics');
studentProto.printName();
studentProto.printBranch();

console.log('\n// Both class-based and prototype-based versions behave the same from the outside.');
console.log('// Classes are essentially syntactic sugar over prototypes.\n');