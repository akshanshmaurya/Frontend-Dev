// Q4 - Constructor function Car and prototype method getDetails
'use strict';

// Constructor function
function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

// Add getDetails method to prototype so it's shared
Car.prototype.getDetails = function() {
    console.log(`Car Details: ${this.brand} ${this.model}`);
};

// Create two car objects
const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Honda', 'Civic');

console.log('\n--- Q4 Demo: Prototype method sharing ---');
car1.getDetails();
car2.getDetails();

// Explain prototype sharing
console.log('\n// Explanation: getDetails is defined once on Car.prototype; both instances share the same function reference.');
console.log('// Verify shared function:', car1.getDetails === car2.getDetails, '\n');
