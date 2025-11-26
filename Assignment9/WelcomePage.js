// Q1_WelcomePage.js
// Requirements:
// 1) On page load show personalized greeting according to time of day
// 2) "Change Greeting" changes text to a motivational quote
// 3) "Toggle Welcome" toggles visibility
// 4) Clicking greeting shows alert

// We use jQuery for compact DOM selection and event handling.

$(function() {
  const $greeting = $('#greeting');
  const $sub = $('#subMessage');

  // Determine greeting based on hour
  function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return `Good Morning!`;
    if (hour < 17) return `Good Afternoon!`;
    return `Good Evening!`;
  }

  // Initialize on page load
  function initGreeting() {
    const name = 'Visitor'; // in real app you'd fetch user's name
    $greeting.text(`${getTimeGreeting()} ${name}`);
  }

  // 1) on load
  initGreeting();

  // 2) Change greeting -> motivational quote
  $('#changeGreeting').on('click', function() {
    // Using jQuery .text() to change the contents
    $greeting.text('Keep going — small steps every day add up!');
    $sub.text('You can always reset using Reset button.');
  });

  // 3) Toggle visibility
  $('#toggleWelcome').on('click', function() {
    // .toggle() quickly shows/hides the element
    $('#welcomeSection').toggle();
  });

  // reset to time-based greeting
  $('#resetGreeting').on('click', initGreeting);

  // 4) Show alert when greeting clicked
  // Use event delegation to demonstrate flexible binding (though simply binding here works)
  $greeting.on('click', function() {
    alert('Welcome! Enjoy learning with us.');
  });

  // Extra: show console message when greeting is hovered (small enhancement)
  $greeting.on('mouseenter', () => console.log('Greeting hovered'));
});
