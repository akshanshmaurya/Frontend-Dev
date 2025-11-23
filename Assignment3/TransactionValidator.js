'use strict';

// ===== Q3: TRANSACTION VALIDATOR =====
console.log('\n===== Q3: TRANSACTION VALIDATOR =====\n');

const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];

console.log('Original Transaction Data:', JSON.stringify(transactions, null, 2));
console.log('\n');

// Custom error classes for different validation failures
class TransactionError extends Error {
    constructor(message, type) {
        super(message);
        this.name = 'TransactionError';
        this.type = type;
    }
}

class NegativeAmountError extends TransactionError {
    constructor(amount) {
        super(`Negative amount detected: ${amount}`, 'NEGATIVE_AMOUNT');
        this.name = 'NegativeAmountError';
    }
}

class MissingPropertyError extends TransactionError {
    constructor(property, transaction) {
        super(`Missing property: ${property}`, 'MISSING_PROPERTY');
        this.name = 'MissingPropertyError';
        this.property = property;
        this.transaction = transaction;
    }
}

class NullTransactionError extends TransactionError {
    constructor() {
        super('Transaction entry is null', 'NULL_ENTRY');
        this.name = 'NullTransactionError';
    }
}

// Arrays to categorize transactions
const validTransactions = [];
const invalidTransactions = [];
const errorsByType = {};

// Loop through each transaction with validation
for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    
    try {
        // Check for null entry
        if (transaction === null) {
            throw new NullTransactionError();
        }
        
        // Check for undefined or non-object
        if (transaction === undefined || typeof transaction !== 'object') {
            throw new TransactionError('Transaction is not a valid object', 'INVALID_TYPE');
        }
        
        // Check for missing id
        if (transaction.id === undefined || transaction.id === null) {
            throw new MissingPropertyError('id', transaction);
        }
        
        // Check for missing amount
        if (transaction.amount === undefined || transaction.amount === null) {
            throw new MissingPropertyError('amount', transaction);
        }
        
        // Check for negative amount
        if (transaction.amount < 0) {
            throw new NegativeAmountError(transaction.amount);
        }
        
        // VALIDATION PASSED: Store valid transaction
        // DEBUG OBSERVATION: Using 'let' here creates new variable in loop iteration scope
        validTransactions.push({
            index: i,
            id: transaction.id,
            amount: transaction.amount,
            status: '✓ Valid'
        });
        
    } catch (error) {
        // Catch specific error types and categorize
        const errorType = error.type || 'UNKNOWN_ERROR';
        
        // Initialize error category if not exists (strict mode won't allow undeclared variables)
        if (!errorsByType[errorType]) {
            errorsByType[errorType] = [];
        }
        
        errorsByType[errorType].push({
            index: i,
            transaction: transaction,
            errorName: error.name,
            errorMessage: error.message
        });
        
        invalidTransactions.push({
            index: i,
            transaction: transaction,
            error: error.message,
            errorType: errorType
        });
        
        console.error(`❌ [${i}] ${error.name}: ${error.message}`);
    }
}

console.log('\n===== VALIDATION REPORT =====\n');

console.log('VALID TRANSACTIONS:');
console.log(`Count: ${validTransactions.length}`);
if (validTransactions.length > 0) {
    console.table(validTransactions);
} else {
    console.log('(none)');
}

console.log('\n\nINVALID TRANSACTIONS:');
console.log(`Count: ${invalidTransactions.length}`);
if (invalidTransactions.length > 0) {
    console.table(invalidTransactions);
} else {
    console.log('(none)');
}

console.log('\n\nERRORS BY TYPE:');
for (const [errorType, errors] of Object.entries(errorsByType)) {
    console.log(`\n  ${errorType}: ${errors.length} occurrence(s)`);
    errors.forEach((err, idx) => {
        console.log(`    [${idx}] ${err.errorMessage}`);
    });
}

console.log('\n===== SUMMARY =====');
console.log(`Total transactions: ${transactions.length}`);
console.log(`Valid: ${validTransactions.length}`);
console.log(`Invalid: ${invalidTransactions.length}`);
console.log(`Success rate: ${((validTransactions.length / transactions.length) * 100).toFixed(2)}%`);
console.log(`Error types found: ${Object.keys(errorsByType).length}`);

// Breakdown by error type
console.log('\nError breakdown:');
Object.entries(errorsByType).forEach(([type, errors]) => {
    console.log(`  - ${type}: ${errors.length}`);
});

