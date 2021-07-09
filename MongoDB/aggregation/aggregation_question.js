// Employees colleciton
db.employees.insertMany(
[{
    "name" : "Roxy",
    "email" : "roxy@gmail.com",
    "phone" : 1234567890.0,
    "city" : "Atlanta",
    "state" : "Georgia",
    "area" : "Brookhaven",
    "country" : "IN",
    "salary": 45000
}
,
{
    "name" : "Drake",
    "email" : "drake@gmail.com",
    "phone" : 7778889991.0,
    "city" : "Buffalo",
    "state" : "New York",
    "area" : "Allentown",
    "country" : "US",
    "salary": 78000

}
,
{
    "name" : "Justin",
    "email" : "justin@gmail.com",
    "phone" : 5558884121.0,
    "city" : "Lost Angeles",
    "state" : "California",
    "area" : "Santa Monica",
    "country" : "US",
    "salary": 94000
}
,
{
    "name" : "Ron3",
    "email" : "ron@gmail.com",
    "phone" : 7885449552.0,
    "city" : "Chicago",
    "state" : "Illinois",
    "area" : "Andersonville",
    "country" : "US",
    "salary": 64000
},
{
    "country" : "IN",
    "name" : "Franky Jr.",
    "email" : "franky@gmail.com",
    "phone" : "7778889995",
    "city" : "Pune",
    "state" : "Maharashtra",
    "salary": 38000
}])

// Get list of employees
db.employees.find()

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
