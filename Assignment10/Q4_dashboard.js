// Q4 - Multi-API Dashboard using Fetch + Promise.all
// Assumes JSON Server for Q4 is running on port 3005 (Q4_db.json)
const API_Q4 = 'http://localhost:3005';

const cardUsers = document.getElementById('usersCount');
const cardOrders = document.getElementById('ordersCount');
const cardProducts = document.getElementById('productsCount');
const warningEl = document.getElementById('warning');

function showSkeletons() {
  cardUsers.innerHTML = '<div class="skeleton"></div>';
  cardOrders.innerHTML = '<div class="skeleton"></div>';
  cardProducts.innerHTML = '<div class="skeleton"></div>';
}

async function loadAll() {
  showSkeletons();
  warningEl.textContent = '';

  const usersPromise = fetch(`${API_Q4}/users`).then(r => r.ok ? r.json() : Promise.reject(new Error('users failed: ' + r.status)));
  const ordersPromise = fetch(`${API_Q4}/orders`).then(r => r.ok ? r.json() : Promise.reject(new Error('orders failed: ' + r.status)));
  const productsPromise = fetch(`${API_Q4}/products`).then(r => r.ok ? r.json() : Promise.reject(new Error('products failed: ' + r.status)));

  const promises = [usersPromise, ordersPromise, productsPromise];

  // Promise.allSettled would show which failed but assignment asks for Promise.all and show a warning when ANY fails
  // We'll use Promise.all and a catch to detect failure — while still attempting to present partial data, so also use allSettled
  try {
    const results = await Promise.all(promises);
    // if we reach here, all succeeded
    const [users, orders, products] = results;
    cardUsers.textContent = users.length;
    cardOrders.textContent = orders.length;
    cardProducts.textContent = products.length;
  } catch (err) {
    // If any failed---we will show warning but also attempt to fetch all results individually using allSettled
    console.warn('One or more endpoints failed', err.message);
    warningEl.textContent = 'Some data could not be loaded.';

    const settled = await Promise.allSettled(promises);
    // fill what succeeded
    if (settled[0].status === 'fulfilled') cardUsers.textContent = settled[0].value.length; else cardUsers.textContent = '—';
    if (settled[1].status === 'fulfilled') cardOrders.textContent = settled[1].value.length; else cardOrders.textContent = '—';
    if (settled[2].status === 'fulfilled') cardProducts.textContent = settled[2].value.length; else cardProducts.textContent = '—';
  }
}

// init load
loadAll();

// Exports for tests
if (typeof module !== 'undefined' && module.exports) module.exports = { loadAll };
