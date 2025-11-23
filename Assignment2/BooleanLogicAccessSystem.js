// ===== Q5: Boolean Logic Access System =====
console.log('\n===== Q5: Boolean Logic Access System =====');

function checkSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
    console.log('\nStatus:');
    console.log(`  Door locked: ${isDoorLocked}`);
    console.log(`  Window closed: ${isWindowClosed}`);
    console.log(`  Alarm on: ${isAlarmOn}`);
    console.log(`  Owner inside: ${isOwnerInside}`);

    // Access is "Secure" only when all required conditions are true
    const isSecure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;

    if (isSecure) {
        console.log('\nResult: ✅ Secure');
    } else {
        console.log('\nResult: ⚠️ Unsafe');

        // Provide hints which conditions failed
        const failures = [];
        if (!isAlarmOn) failures.push('Alarm is OFF');
        if (!isDoorLocked) failures.push('Door is UNLOCKED');
        if (!isWindowClosed) failures.push('Window is OPEN');
        if (!isOwnerInside) failures.push('Owner is NOT INSIDE');

        console.log('Failures:', failures.join(', '));
    }

    return isSecure;
}

// Test different scenarios
console.log('\n--- Scenario 1: Ideal secure state ---');
checkSecurity(true, true, true, true);

console.log('\n--- Scenario 2: Alarm off ---');
checkSecurity(true, true, false, true);

console.log('\n--- Scenario 3: Window open ---');
checkSecurity(true, false, true, true);

console.log('\n--- Scenario 4: Owner not inside ---');
checkSecurity(true, true, true, false);

console.log('\n--- Scenario 5: Multiple failures ---');
checkSecurity(false, false, false, false);

// Logical combinations demonstration using && and ||
console.log('\n--- Logical Expression Examples ---');
const e1 = true && (false || true); // true && true => true
const e2 = (false || false) && true; // false && true => false
console.log('Example e1 (true && (false || true)):', e1);
console.log('Example e2 ((false || false) && true):', e2);

console.log('\nQ5 tests complete.');