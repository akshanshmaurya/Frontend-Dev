// ===== Q1: Scope Conflict Resolver =====
// Global bonus available across scopes
const bonus = 5000;

console.log('\n===== Q1: Scope Conflict Resolver =====');
console.log('Global bonus (initial):', bonus);

// Function that calculates salary using local variables
function calculateSalary(isPermanent) {
    // Local salary variable (scoped to the function)
    let salary = 40000;

    // Add bonus only when the employee is permanent
    // The bonus here refers to the global `bonus` variable
    const total = isPermanent ? salary + bonus : salary;

    // Print details inside the function
    console.log(`\n[Inside calculateSalary] isPermanent = ${isPermanent}`);
    console.log(`Local salary: ₹${salary.toLocaleString()}`);
    console.log(`Bonus included? ${isPermanent ? 'Yes' : 'No'}`);
    console.log(`Total salary (inside function): ₹${total.toLocaleString()}`);

    // Demonstrate that changing isPermanent does NOT modify global bonus
    console.log('Global bonus (inside function, unchanged):', bonus);
    
    return total;
}

// Test with permanent employee
const totalPermanent = calculateSalary(true);

// Test with contract employee
const totalContract = calculateSalary(false);

// Show that global variable remains unchanged
console.log('\n[After function calls] Global bonus remains:', bonus);

// Demonstrate modifying a global variable intentionally (for comparison)
// (This is NOT required by the task, but helps explain scope)
let globalBonusMutable = 5000; // different variable that can be changed
console.log('\nMutable globalBonusMutable (before):', globalBonusMutable);

function changeGlobalBonus(newVal) {
    // reassign the outer-scope variable (demonstrates mutation of global)
    globalBonusMutable = newVal;
    console.log('[Inside changeGlobalBonus] globalBonusMutable set to', globalBonusMutable);
}

changeGlobalBonus(8000);
console.log('globalBonusMutable (after):', globalBonusMutable);

console.assert(totalPermanent === 45000, 'Permanent total should be 45000');
console.assert(totalContract === 40000, 'Contract total should be 40000');

console.log('Q1 tests passed (assertions did not fail).\n');