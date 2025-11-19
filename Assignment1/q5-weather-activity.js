// Q5: Weather Activity Planner
// Suggest an activity based on temperature, rain, and wind speed.

const temperature = 22; // degrees Celsius
const isRaining = false;
const windSpeed = 12; // km/h

let suggestion;

if (isRaining) {
	suggestion = "Stay indoors with hot coffee.";
} else if (temperature > 35) {
	suggestion = "Go swimming.";
} else if (temperature < 15 && windSpeed > 20) {
	suggestion = "Too cold and windy — stay home.";
} else {
	suggestion = "Perfect day for a walk.";
}

console.log(`Weather summary → Temp: ${temperature}°C, Raining: ${isRaining}, Wind: ${windSpeed} km/h`);
console.log(`Recommendation: ${suggestion}`);