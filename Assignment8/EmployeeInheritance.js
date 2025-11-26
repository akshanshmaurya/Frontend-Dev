"use strict";

// Q4 - Employee Inheritance (Employee and Manager classes)
// - Employee: name, department, work() method
// - Manager extends Employee and overrides work()

class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  work() {
    console.log(`${this.name} from ${this.department} is doing regular tasks.`);
  }
}

class Manager extends Employee {
  constructor(name, department, reports = []) {
    super(name, department);
    this.reports = reports; // team members
  }

  // Manager overrides work()
  work() {
    console.log(`${this.name} (Manager) is planning, delegating and reviewing team work.`);
  }

  addReport(employee) {
    this.reports.push(employee);
  }
}

// Demo / tests
if (typeof require !== 'undefined' && require.main === module) {
  console.log('\n--- Q4: Employee & Manager Demo (Polymorphism) ---');

  const e1 = new Employee('Rita', 'Engineering');
  const e2 = new Employee('Sam', 'Design');
  const m1 = new Manager('Priya', 'Engineering', [e1]);

  // All are treated as Employees. Polymorphism allows manager.work() to override.
  [e1, e2, m1].forEach(emp => emp.work());

  console.log('\nRuntime polymorphism: Manager instance uses its own work() implementation, Employee instances use theirs.');
}

if (typeof module !== 'undefined' && module.exports) module.exports = { Employee, Manager };
