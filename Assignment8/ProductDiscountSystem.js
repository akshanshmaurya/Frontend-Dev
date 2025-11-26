"use strict";

// Q3 - Product Discount System (constructor + prototype)
// - Product constructor with name, price
// - Product.prototype.applyDiscount(percent) returns new price

function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.applyDiscount = function(percent) {
  // returns new price without mutating original (abstraction)
  if (typeof percent !== 'number' || percent < 0 || percent > 100) {
    throw new Error('Invalid discount percent');
  }
  const discounted = this.price - (this.price * percent / 100);
  return Number(discounted.toFixed(2));
};

// Demo
if (typeof require !== 'undefined' && require.main === module) {
  console.log('\n--- Q3: Product Discount System Demo ---');
  const p1 = new Product('Headphones', 2500);
  const p2 = new Product('Smartwatch', 4500);
  const p3 = new Product('Charger', 499);

  const d1 = p1.applyDiscount(10); // 10%
  const d2 = p2.applyDiscount(25); // 25%
  const d3 = p3.applyDiscount(5);  // 5%

  console.log(`${p1.name} original: ₹${p1.price} -> after 10%: ₹${d1}`);
  console.log(`${p2.name} original: ₹${p2.price} -> after 25%: ₹${d2}`);
  console.log(`${p3.name} original: ₹${p3.price} -> after 5%: ₹${d3}`);

  console.log('\nExplanation: The applyDiscount method abstracts discount logic so callers only provide percent and get new price.');
}

if (typeof module !== 'undefined' && module.exports) module.exports = { Product };