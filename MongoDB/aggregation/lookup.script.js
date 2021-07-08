// Why do we need lookup
// the $lookup function in MongoDB allows us to join documents on collections that reside in the same database.
//The $lookup function will return the documents as if they came from this ‘joined’ collection, in the form
//of a sub-array of the target original collection. This function can handle both uncorrelated sub-queries and equality matches.

// MySQL Ref
// SELECT *, <output array field>
// FROM collection
// WHERE <output array field> IN (SELECT <documents as determined from the pipeline>
//                                FROM <collection to join>
//                                WHERE <pipeline> );

// use inventory_db;

db.orders.insert([
  { _id: 1, item: "almonds", price: 12, quantity: 2 },
  { _id: 2, item: "pecans", price: 20, quantity: 1 },
  { _id: 3 },
]);

db.inventory.insert([
  { _id: 1, sku: "almonds", description: "product 1", instock: 120 },
  { _id: 2, sku: "bread", description: "product 2", instock: 80 },
  { _id: 3, sku: "cashews", description: "product 3", instock: 60 },
  { _id: 4, sku: "pecans", description: "product 4", instock: 70 },
  { _id: 5, sku: null, description: "Incomplete" },
  { _id: 6 },
]);

// Lookup
// The following aggregation operation on the orders collection joins the documents from orders with the documents from the inventory collection using the fields item from the orders collection and the sku field from the inventory collection:
//

// Perform a Single Equality Join with $lookup
db.orders.aggregate([
  {
    $lookup: {
      // from: Other Collection
      from: "inventory",
      // localField: from current collection
      localField: "item",
      // foreignField: from the collection that we are doing the lookup
      foreignField: "sku",
      // as: the output varaible name
      as: "inventory_docs",
    },
  },
]);

// Clean query
db.orders.aggregate([
  {
    $lookup: {
      from: "inventory",
      localField: "item",
      foreignField: "sku",
      as: "inventory_docs",
    },
  },
]);

// Use $lookup with an Array
db.classes.insert([
  {
    _id: 1,
    title: "Reading is ...",
    enrollmentlist: ["giraffe2", "pandabear", "artie"],
    days: ["M", "W", "F"],
  },
  {
    _id: 2,
    title: "But Writing ...",
    enrollmentlist: ["giraffe1", "artie"],
    days: ["T", "F"],
  },
]);

db.members.insert([
  { _id: 1, name: "artie", joined: new Date("2016-05-01"), status: "A" },
  { _id: 2, name: "giraffe", joined: new Date("2017-05-01"), status: "D" },
  { _id: 3, name: "giraffe1", joined: new Date("2017-10-01"), status: "A" },
  { _id: 4, name: "panda", joined: new Date("2018-10-11"), status: "A" },
  { _id: 5, name: "pandabear", joined: new Date("2018-12-01"), status: "A" },
  { _id: 6, name: "giraffe2", joined: new Date("2018-12-01"), status: "D" },
]);

// Join the classes and members ON name field
db.classes.aggregate([
  {
    $lookup: {
      from: "members",
      localField: "enrollmentlist",
      foreignField: "name",
      as: "allNames",
    },
  },
]);
