// Q1: Personalized Login Greeting
// Use new Date().getHours() to determine which greeting to show.

const userName = "Alex Morgan"; // Update with the actual user name when integrating.
const currentHour = new Date().getHours();

let greeting;

if (currentHour < 12) {
	greeting = `Good Morning ${userName}!`;
} else if (currentHour >= 12 && currentHour < 17) {
	greeting = `Good Afternoon ${userName}!`;
} else {
	greeting = `Good Evening ${userName}!`;
}

console.log(greeting);