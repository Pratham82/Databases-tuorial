#!/bin/bash
echo "Loading shopping cart db...."
mongo --quiet --eval '
    db = db.getSiblingDB("shopping_cart");
    db.purchase_orders.insertMany(
     [
          {product: "toothbrush", total: 4.75, customer: "Mike"},
          {product: "guitar", total: 199.99, customer: "Tom"},
          {product: "guitar", total: 299.99, customer: "Mike"},
          {product: "milk", total: 11.33, customer: "Mike"},
          {product: "pizza", total: 8.50, customer: "Karen"},
          {product: "toothbrush", total: 4.75, customer: "Karen"},
          {product: "pizza", total: 4.75, customer: "Dave"},
          {product: "toothbrush", total: 4.75, customer: "Mike"},
          {product: "guitar", total: 522.99, customer: "Dave"},
     ]);
'
echo "DB Loaded successfully ✅"
