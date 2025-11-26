"use strict";

// Q5 - Ride-Sharing Application
// Classes: User (name, rating), Driver (inherits from User, vehicle details), Trip (from, to, distance)
// Trip.calculateFare() uses distance; throws if distance invalid

class User {
  constructor(name, rating = 5) {
    this.name = name;
    this.rating = rating;
  }
}

class Driver extends User {
  constructor(name, rating, vehicle) {
    super(name, rating);
    this.vehicle = vehicle; // {make, model, plate}
  }

  getDriverDetails() {
    return `${this.name} (${this.vehicle.make} ${this.vehicle.model} - ${this.vehicle.plate})`;
  }
}

class Trip {
  constructor(fromLocation, toLocation, distanceKm, driver = null, user = null) {
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distanceKm = distanceKm; // number in km
    this.driver = driver;
    this.user = user;
  }

  // Calculate fare using base fare + per km rate
  calculateFare() {
    if (typeof this.distanceKm !== 'number' || isNaN(this.distanceKm)) {
      throw new Error('Distance must be provided as a number');
    }
    if (this.distanceKm < 0) {
      throw new Error('Distance cannot be negative');
    }

    const baseFare = 30; // ₹30 base
    const perKmRate = 12; // ₹12 per km
    const fare = baseFare + (this.distanceKm * perKmRate);
    return Number(fare.toFixed(2));
  }
}

// Demo / tests
if (typeof require !== 'undefined' && require.main === module) {
  console.log('\n--- Q5: Ride-Sharing Demo ---');

  const rider = new User('Naveen', 4.8);
  const driver = new Driver('Sonal', 4.9, { make: 'Toyota', model: 'Etios', plate: 'DL3C-AA1111' });

  // Valid trip
  try {
    const trip = new Trip('Airport', 'Hotel', 12.5, driver, rider);
    console.log('Driver:', driver.getDriverDetails());
    console.log('Rider:', rider.name, 'Rating:', rider.rating);
    const fare = trip.calculateFare();
    console.log(`Trip from ${trip.fromLocation} to ${trip.toLocation} (distance: ${trip.distanceKm}km) - Fare: ₹${fare}`);
  } catch (err) {
    console.error('Trip Error:', err.message);
  }

  // Invalid trip (negative distance)
  try {
    const badTrip = new Trip('Home', 'Work', -5, driver, rider);
    console.log('Trying to calculate fare for negative distance');
    console.log(badTrip.calculateFare());
  } catch (err) {
    console.error('Caught error for bad trip:', err.message);
  }
}

if (typeof module !== 'undefined' && module.exports) module.exports = { User, Driver, Trip };
