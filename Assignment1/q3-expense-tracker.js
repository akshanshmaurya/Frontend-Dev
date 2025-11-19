// Q3: Monthly Expense Tracker
// Track expenses across categories, add tax, and report totals.

const expenses = [
	{ category: "Food", amount: 320.5 },
	{ category: "Travel", amount: 150.0 },
	{ category: "Rent", amount: 1200.0 },
	{ category: "Bills", amount: 260.75 },
	{ category: "Leisure", amount: 180.25 }
];

const total = expenses.reduce((sum, entry) => sum + entry.amount, 0);
const average = total / expenses.length;

const taxRate = 0.10;
let totalWithTax = total;
totalWithTax += total * taxRate; // using assignment operator to add tax

console.log(`Total before tax: $${total.toFixed(2)}`);
console.log(`Average spend per category: $${average.toFixed(2)}`);
console.log(`Final amount after 10% tax: $${totalWithTax.toFixed(2)}`);