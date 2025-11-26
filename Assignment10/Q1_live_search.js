// Q1 Live Search (jQuery AJAX) — Uses /products?q=value
// Assumes JSON Server runs with Q1_db.json and serves /products
// Debounce typing to avoid excessive requests

$(function() {
  const $input = $('#searchBox');
  const $status = $('#status');
  const $results = $('#results');

  let timer = null;
  const DEBOUNCE = 300;
  const API_BASE = 'http://localhost:3001'; // when running JSON Server for Q1, run on port 3001

  function renderProducts(products) {
    $results.empty();
    if (!products || products.length === 0) {
      $results.html('<div class="no-results">No products found</div>');
      return;
    }

    products.forEach(p => {
      const $card = $(
        `<div class="result">
          <img class="thumb" src="${p.image}" alt="${p.name}">
          <div>
            <div class="meta">${p.name} — ₹${p.price}</div>
            <div class="desc">Product id: ${p.id}</div>
          </div>
        </div>`
      );
      $results.append($card);
    });
  }

  function showLoading() {
    $status.html('<div class="loading">Loading…</div>');
  }
  function hideLoading() { $status.empty(); }

  // Make the AJAX call — uses jQuery .get()
  function search(query) {
    showLoading();
    $.get(`${API_BASE}/products`, { q: query })
      .done(function(data) {
        renderProducts(data);
      })
      .fail(function() {
        $results.html('<div class="no-results">Error fetching products</div>');
      })
      .always(function() {
        hideLoading();
      });
  }

  $input.on('input', function() {
    clearTimeout(timer);
    const val = this.value.trim();

    timer = setTimeout(() => {
      // if empty, show all items as convenience
      search(val);
    }, DEBOUNCE);
  });

  // initial load
  search('');
});
