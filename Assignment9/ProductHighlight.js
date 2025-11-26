// Q2_ProductHighlight.js
// Uses jQuery to implement interactions described in the assignment.

$(function() {
  const $grid = $('#productGrid');

  // 1) Click on a product -> toggle highlight
  // Using event delegation (.on) on the parent container so new elements will be handled too
  $grid.on('click', '.product', function(e) {
    // if the click target is the favorite button, don't toggle highlight here
    if ($(e.target).closest('.fav').length) return;

    const $p = $(this);
    $p.toggleClass('highlight');
  });

  // 2) Hover over a product -> show additional details
  $grid.on('mouseenter', '.product', function() {
    $(this).find('.details').fadeIn(150);
  }).on('mouseleave', '.product', function() {
    $(this).find('.details').fadeOut(120);
  });

  // 3) Clicking favorite icon toggles 'selected' class — stop propagation to avoid the product click handler
  $grid.on('click', '.fav', function(e) {
    e.stopPropagation(); // important so clicking favorite doesn't trigger product-click
    const $btn = $(this);
    $btn.toggleClass('selected');
    // simple visual change: filled heart
    $btn.text($btn.hasClass('selected') ? '❤' : '♡');
  });

  // 4) Apply special styles to products with discounts using attribute selector
  // We'll add CSS class 'discount' programmatically for demo
  $grid.find('.product[data-discount]').each(function() {
    $(this).addClass('discount');
  });

  // 5) Show alert if a product is out of stock using data attribute
  // We'll specifically intercept clicks and show alert when out of stock
  $grid.on('click', '.product', function(e) {
    if ($(e.target).closest('.fav').length) return; // ignore favorites

    const stock = Number($(this).data('stock'));
    if (stock <= 0) {
      alert('Sorry — this product is out of stock');
    }
  });

  // Extra: Log product price list using .map() on jQuery collection
  const prices = $grid.find('.product').map((i, el) => Number($(el).data('price'))).get();
  console.log('Prices array (for dev):', prices);
});