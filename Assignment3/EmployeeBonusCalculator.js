'use strict';

// ===== Q2: EMPLOYEE BONUS CALCULATOR =====

console.log('\n===== Q2: EMPLOYEE BONUS CALCULATOR =====\n');

const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" }
];

console.log('Original Employee Data:', JSON.stringify(employees, null, 2));
console.log('\n');

// Process employees with error handling
const processedEmployees = [];
const errors = [];

for (let i = 0; i < employees.length; i++) {
    const emp = employees[i];
    
    try {
        // STRICT MODE NOTE: 
        // Without 'use strict', missing properties would silently fail.
        // With 'use strict', we must explicitly check for property existence.
        
        if (!emp) {
            throw new Error('Employee object is null or undefined');
        }
        
        if (!emp.name) {
            throw new Error('Missing name property');
        }
        
        // Convert salary to number
        const salary = Number(emp.salary);
        if (isNaN(salary)) {
            throw new Error(`Invalid salary value: ${emp.salary}`);
        }
        
        // Convert years to number
        const years = Number(emp.years);
        if (isNaN(years)) {
            throw new Error(`Invalid years value: ${emp.years}`);
        }
        
        // Calculate bonus based on years of service
        let bonusPercentage;
        if (years > 3) {
            bonusPercentage = 0.10; // 10% for senior employees
        } else {
            bonusPercentage = 0.05; // 5% for junior employees
        }
        
        const bonusAmount = salary * bonusPercentage;
        const totalCompensation = salary + bonusAmount;
        
        // Use template literal for formatted output
        const record = {
            name: emp.name,
            salary: salary,
            years: years,
            bonusPercentage: bonusPercentage * 100,
            bonusAmount: bonusAmount,
            totalCompensation: totalCompensation,
            formattedOutput: `Employee: ${emp.name} | Salary: ₹${salary.toLocaleString()} | Years: ${years} | Bonus: ₹${bonusAmount.toFixed(2)} (${bonusPercentage * 100}%) | Total: ₹${totalCompensation.toFixed(2)}`
        };
        
        processedEmployees.push(record);
        
    } catch (error) {
        // Catch and store error details
        errors.push({
            index: i,
            employeeName: emp?.name || 'Unknown',
            errorMessage: error.message
        });
        console.error(`❌ Error processing employee ${i}:`, error.message);
    }
}

console.log('===== PROCESSED EMPLOYEES =====\n');

// Display processed records in table format
if (processedEmployees.length > 0) {
    const summaryTable = processedEmployees.map(emp => ({
        Name: emp.name,
        Salary: `₹${emp.salary.toLocaleString()}`,
        Years: emp.years,
        'Bonus %': `${emp.bonusPercentage}%`,
        'Bonus Amount': `₹${emp.bonusAmount.toFixed(2)}`,
        'Total': `₹${emp.totalCompensation.toFixed(2)}`
    }));
    
    console.table(summaryTable);
    
    console.log('\n===== FORMATTED DETAILS =====\n');
    processedEmployees.forEach(emp => {
        console.log(emp.formattedOutput);
    });
}

console.log('\n===== ERROR REPORT =====');
if (errors.length > 0) {
    console.log(`Errors encountered: ${errors.length}`);
    console.table(errors);
} else {
    console.log('✓ No errors encountered.');
}

console.log('\n===== SUMMARY =====');
console.log(`Total employees: ${employees.length}`);
console.log(`Successfully processed: ${processedEmployees.length}`);
console.log(`Errors: ${errors.length}`);

if (processedEmployees.length > 0) {
    const totalBonus = processedEmployees.reduce((sum, emp) => sum + emp.bonusAmount, 0);
    const totalCompensation = processedEmployees.reduce((sum, emp) => sum + emp.totalCompensation, 0);
    console.log(`Total bonus payout: ₹${totalBonus.toFixed(2)}`);
    console.log(`Total compensation: ₹${totalCompensation.toFixed(2)}`);
}

