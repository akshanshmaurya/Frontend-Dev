// Q2: Multi-Type Data Summary
// Simulate various user data entries and report their types.

const fullName = "Rohan Patel"; // string
const accountBalance = 4523.75; // number
const isSubscribed = true; // boolean
const favoriteTags = ["design", "tech", "travel"]; // array
const profile = { city: "Mumbai", level: "Gold" }; // object
const lastLogin = null; // null
let referralCode; // undefined

const entries = [
	{ Label: "Full Name", Value: fullName, Type: typeof fullName },
	{ Label: "Account Balance", Value: accountBalance, Type: typeof accountBalance },
	{ Label: "Subscribed", Value: isSubscribed, Type: typeof isSubscribed },
	{ Label: "Favorite Tags", Value: favoriteTags, Type: Array.isArray(favoriteTags) ? "array" : typeof favoriteTags },
	{ Label: "Profile", Value: profile, Type: typeof profile },
	{ Label: "Last Login", Value: lastLogin, Type: lastLogin === null ? "null" : typeof lastLogin },
	{ Label: "Referral Code", Value: referralCode, Type: typeof referralCode }
];

console.table(entries);