"use strict";

// Q2 - Online Food Ordering (map + Error Handling)
// - menuItems map of name -> price
// - calculateBill(orderItems): map to price list, reduce to total
// - throws error if any ordered item missing from menu

const menuItems = new Map([
  ['Pizza', 350],
  ['Burger', 180],
  ['Sushi', 420],
  ['Salad', 120],
  ['Fries', 80]
]);

function calculateBill(orderItems = []) {
  // Validate input
  if (!Array.isArray(orderItems)) throw new TypeError('orderItems must be an array');

  // Map ordered items to their prices — throw if item not found
  const priceList = orderItems.map(item => {
    if (!menuItems.has(item)) throw new Error(`Invalid menu item ordered: ${item}`);
    return menuItems.get(item);
  });

  // Sum total using reduce
  const total = priceList.reduce((acc, p) => acc + p, 0);

  return { orderItems, priceList, total };
}

// Demo/testing
if (typeof require !== 'undefined' && require.main === module) {
  console.log('\n--- Q2: Online Food Ordering Demo ---');

  const order1 = ['Pizza', 'Fries'];
  const order2 = ['Sushi', 'Salad', 'Burger'];
  const invalidOrder = ['Pizza', 'Pasta']; // Pasta not on menu

  try {
    const bill1 = calculateBill(order1);
    console.log('Order 1:', bill1);
  } catch (err) {
    console.error('Order 1 Error:', err.message);
  }

  try {
    const bill2 = calculateBill(order2);
    console.log('Order 2:', bill2);
  } catch (err) {
    console.error('Order 2 Error:', err.message);
  }

  try {
    const bad = calculateBill(invalidOrder);
    console.log('Invalid Order:', bad);
  } catch (err) {
    console.error('Invalid Order Error:', err.message);
  }
}

if (typeof module !== 'undefined' && module.exports) module.exports = { menuItems, calculateBill };