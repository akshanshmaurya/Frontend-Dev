// Q6: Progressive Discount System
// Apply tiered discounts based on purchase totals.

const totalPurchase = 7200; // Update with the shopper's total

let discountRate = 0;

if (totalPurchase >= 10000) {
	discountRate = 0.25;
} else if (totalPurchase >= 5000) {
	discountRate = 0.15;
} else if (totalPurchase >= 2000) {
	discountRate = 0.05;
}

const discountAmount = totalPurchase * discountRate;
const finalPrice = Math.round(totalPurchase - discountAmount);

console.log(`Original Total: ₹${Math.round(totalPurchase)}`);
console.log(`Discount Applied: ${(discountRate * 100)}%`);
console.log(`Final Price After Discount: ₹${finalPrice}`);