'use strict';

// ===== Q1: DYNAMIC DATA PARSER =====
console.log('\n===== Q1: DYNAMIC DATA PARSER =====\n');

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

console.log('Original API Data:', apiData);
console.log('');

// Arrays to store valid and invalid data
const validNumeric = [];
const invalidData = [];

// Detailed analysis for each value
const detailedReport = [];

// Loop through each value in apiData
for (let i = 0; i < apiData.length; i++) {
    const value = apiData[i];
    
    // Try to convert to Number
    const asNumber = Number(value);
    
    // Try to convert to Boolean
    const asBoolean = Boolean(value);
    
    // Try to convert to String
    const asString = String(value);
    
    // Check if conversion to number is valid (not NaN)
    const isValidNumber = !isNaN(asNumber) && asNumber !== null && asString.trim() !== '';
    
    // Additional check: string should not be pure whitespace or contain invalid patterns like "100px"
    let isReallyValid = isValidNumber;
    if (isValidNumber && typeof value === 'string') {
        // String must parse cleanly without extra characters
        isReallyValid = /^-?\d+(\.\d+)?$/.test(value.trim());
    }
    
    // Log observation with HOISTING NOTE:
    // Variables declared here are in function scope; no hoisting issues with let/const
    
    const entry = {
        index: i,
        original: value,
        originalType: typeof value,
        asNumber: asNumber,
        asBoolean: asBoolean,
        asString: asString,
        isValid: isReallyValid
    };
    
    detailedReport.push(entry);
    
    // Categorize
    if (isReallyValid) {
        validNumeric.push(asNumber);
    } else {
        invalidData.push({
            value: value,
            reason: isNaN(asNumber) ? 'NaN conversion' : asNumber === null ? 'null value' : asString.trim() === '' ? 'empty/whitespace' : 'invalid format'
        });
    }
}

// Display detailed report with conditional formatting
console.log('===== DETAILED CONVERSION REPORT =====\n');
console.table(detailedReport);

console.log('\n===== VALID NUMERIC DATA =====');
console.log('Count:', validNumeric.length);
console.log('Values:', validNumeric);

console.log('\n===== INVALID DATA (Skipped) =====');
console.log('Count:', invalidData.length);
invalidData.forEach((item, idx) => {
    console.log(`  [${idx}] Value: ${JSON.stringify(item.value)} → Reason: ${item.reason}`);
});

console.log('\n===== SUMMARY =====');
console.log(`Total entries processed: ${apiData.length}`);
console.log(`Valid numeric entries: ${validNumeric.length}`);
console.log(`Invalid/skipped entries: ${invalidData.length}`);
console.log(`Success rate: ${((validNumeric.length / apiData.length) * 100).toFixed(2)}%`);

