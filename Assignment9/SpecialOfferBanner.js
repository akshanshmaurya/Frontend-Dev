// Q4_SpecialOfferBanner.js
// Demonstrates various jQuery visibility/animation methods and auto-rotate banners every 5s

$(function() {
  const $banners = $('#banners .banner');
  let rotateInterval = null;
  let activeIndex = 0; // track rotation

  // 1) Hide button hides first banner
  $('#hideBtn').on('click', () => {
    $banners.first().hide();
  });

  // 2) Show button reveals any hidden banners
  $('#showBtn').on('click', () => {
    $banners.filter(':hidden').show();
  });

  // 3) Slide Up/Down toggle for second banner
  $('#slideToggle').on('click', () => {
    $banners.eq(1).slideToggle(300);
  });

  // 4) Fade In/Out toggle for third banner
  $('#fadeToggle').on('click', () => {
    $banners.eq(2).fadeToggle(300);
  });

  // 5) Auto-rotate banners every 5 seconds using fadeIn/fadeOut
  function startRotation() {
    if (rotateInterval) return; // already running
    rotateInterval = setInterval(() => {
      const next = (activeIndex + 1) % $banners.length;

      // fade out active, fade in next
      $banners.eq(activeIndex).fadeOut(350);
      $banners.eq(next).fadeIn(400);
      activeIndex = next;
    }, 5000);
  }

  function stopRotation() {
    if (rotateInterval) { clearInterval(rotateInterval); rotateInterval = null; }
  }

  $('#startRotate').on('click', startRotation);
  $('#stopRotate').on('click', stopRotation);

  // Start hidden state for all but first banner so rotation is clearly visible
  $banners.slice(1).hide();

  // Small accessibility: pause rotation on hover
  $('#banners').on('mouseenter', stopRotation).on('mouseleave', startRotation);

  
});