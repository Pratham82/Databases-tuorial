// Get list of employees

// $in attribute
// Use the $in Operator to Match Values in an Array

// Find the employees whose names are Roxy and Drake
db.employees.find({ name: { $in: ["Roxy", "Drake"] } });

// $regex
// Find employee names which starts with D
// Case insensitive
db.employees.find({ name: { $regex: /^D/i } });

//Find the employee  who are getting paid more than 50k and give me their name
db.employees.find({ salary: { $gt: 50000 } });

//Find the employee  who are getting paid more than 50k and give me their count
db.employees.count({ salary: { $gt: 50000 } });

//Solving above 2 using aggregation pipeline
db.employees.aggregate([
  // First filter out the assholes
  { $match: { salary: { $gt: 50000 } } },

  // Sort the salaries in descending order
  { $sort: { salary: -1 } },

  // Only show their name and salary
  { $project: { _id: 0, name: 1, salary: 1 } },
]);

db.employees
  .find({ salary: { $gt: 50000 } }, { _id: 0, salary: 1, name: 1 })
  .sort({ salary: -1 });

db.employees.find({ salary: { $gt: 50000 } }, { _id: 0, salary: 1, name: 1 });

// Give me the total amount the company is spending on these people
db.employees.aggregate([
  { $match: { salary: { $gt: 50000 } } },
  { $group: { _id: null, final_id: { $sum: "$salary" } } },
  { $project: { _id: 0 } },
]);

// Find the average salary of the emploies working in the company
db.employees.aggregate([
  { $match: { salary: { $gt: 50000 } } },
  { $group: { _id: null, average_salary: { $avg: "$salary" } } },
  { $project: { _id: 0 } },
]);
