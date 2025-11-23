// ===== Q2: String Manipulation Report =====
console.log('\n===== Q2: String Manipulation Report =====');

const rawTitle = ' wireless headphones PRO ';
console.log('Raw Title:', JSON.stringify(rawTitle));

// 1) Trim extra spaces
const trimmed = rawTitle.trim();

// 2) Convert to lowercase
const lower = trimmed.toLowerCase();

// 3) Replace "pro" (case-insensitive now because we lowered) with "Pro Edition"
const replaced = lower.replace(/\bpro\b/g, 'Pro Edition');

// 4) Capitalize first letter of each word
const cleaned = replaced
    .split(' ')
    .map(word => {
        if (word.length === 0) return word;
        return word[0].toUpperCase() + word.slice(1);
    })
    .join(' ');

// 5) Display cleaned title and its length
console.log('Cleaned Title:', cleaned);
console.log('Length:', cleaned.length);

// Extra: show each transformation step for learning
console.log('\n[Steps]');
console.log('Trimmed:', JSON.stringify(trimmed));
console.log('Lowercase:', JSON.stringify(lower));
console.log('After replace:', JSON.stringify(replaced));
console.log('Final cleaned:', JSON.stringify(cleaned));

// Basic tests
console.assert(cleaned.includes('Pro Edition'), 'Cleaned title must contain "Pro Edition"');
console.log('Q2 assertions passed (if no assertion errors).\n');