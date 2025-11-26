// Q5_TeamDirectory.js
// Demonstrates hierarchical operations with jQuery (.children, .next, .parent, .find)

$(function(){
  const $teams = $('#teams');

  // 1) Click manager => highlight all direct reports
  $teams.on('click', '.manager', function(){
    const $dept = $(this).parent(); // parent .dept
    // remove previous highlights first
    $teams.find('.employee').removeClass('highlight');
    // highlight direct children .employees > .employee
    $dept.children('.employees').children('.employee').addClass('highlight');
  });

  // 2) Hover on an employee => show contact info using .next() or data attr
  // (we used inline span.info which is inside; we'll show that)
  $teams.on('mouseenter', '.employee', function(){
    // Use .find or .children to get nested info span if needed
    $(this).addClass('highlight');
    $(this).find('.info').fadeIn(140);
  }).on('mouseleave', '.employee', function(){
    $(this).removeClass('highlight');
    $(this).find('.info').fadeOut(80);
  });

  // 3) Click on department -> change background of all members in department using .children()
  $teams.on('click', '.dept', function(e){
    // avoid triggering when clicking on employee or manager buttons
    if ($(e.target).closest('.employee').length) return;
    const $dept = $(this);
    $dept.children('.employees').children().css('background','#f0fff8');
  });

  // 4) Select a random employee -> highlight siblings
  $('#randomBtn').on('click', function(){
    const $allEmployees = $teams.find('.employee');
    const idx = Math.floor(Math.random() * $allEmployees.length);
    const $picked = $allEmployees.eq(idx);
    // highlight siblings of the selected (i.e., others in same employees list)
    $allEmployees.removeClass('highlight');
    $picked.siblings('.employee').addClass('highlight');
    // also mark the selected element specially
    $picked.css('border','2px solid #2b6df6');
    setTimeout(()=> $picked.css('border',''),2000);
  });

  // 5) Collapse/expand team using .parent() and .find()
  $('#collapseAll').on('click', function(){
    $teams.find('.employees').slideUp(180);
  });
  $('#expandAll').on('click', function(){
    $teams.find('.employees').slideDown(180);
  });

});