// Q3_InteractiveFAQ.js
// Implement interactions using jQuery:
// 1) Click question => toggle answer
// 2) Hover => change question color
// 3) Double-click question => collapse all answers
// 4) Focus on answer input => highlight parent question
// 5) Blur => reset background

$(function() {
  const $faq = $('#faq');

  // 1) Click to toggle the answer — delegation from container (.on)
  $faq.on('click', '.question', function() {
    const $qa = $(this).closest('.qa');
    $qa.find('.answer').slideToggle(180);
  });

  // 2) Hover change color
  $faq.on('mouseenter', '.question', function() {
    $(this).addClass('hovered');
  }).on('mouseleave', '.question', function() {
    $(this).removeClass('hovered');
  });

  // 3) Double-click collapses all answers
  $faq.on('dblclick', '.question', function() {
    $faq.find('.answer').slideUp(180);
  });

  // 4 & 5) Focus on input highlight parent question; blur resets
  $faq.on('focus', '.note-input', function() {
    // highlight parent .qa visually -> add class
    $(this).closest('.qa').css('background','#fff9e6');
  });

  $faq.on('blur', '.note-input', function() {
    // reset the background
    $(this).closest('.qa').css('background','');
  });

  // Accessibility: keyboard toggling when Enter pressed on question
  $faq.on('keydown', '.question', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).trigger('click');
    }
  });
});