var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readproductList();
});

function readproductList() {
  console.log("Showcasing all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    //connection.end();
    runSearch();
  });
}

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Please fill out the following form ?",
        choices: [
          "Please enter the item id of the product you wish to buy: ",
          "Please enter the quantity of the products you wish to buy: ",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Please enter the item id of the product you wish to buy: ":
          itemIDSearch();
          break;
  
        case "Please enter the quantity of the products you wish to buy: ":
          quantitySearch();
          break;
  
        case "exit":
          connection.end();
          break;
        }
      });
  }

  function itemIDSearch() {
    inquirer
      .prompt({
        name: "itemID",
        type: "input",
        message: "What item id are you looking for?"
      })
      .then(function(answer) {
        console.log(answer.itemID);
        connection.query("SELECT * FROM products WHERE ?", { item_id: answer.itemID }, function(err, res) {
          if (err) throw err;
          console.log(
            "Item ID: " +
              res[0].item_id +
              " || Product's Name: " +
              res[0].product_name +
              " || Department's Name: " +
              res[0].department_name +
              " || Price: " +
              res[0].price +
              " || Quantity: " +
              res[0].stock_quantity
          );
          runSearch();
        });
      });
  }

  function quantitySearch() {
    inquirer
      .prompt({
        name: "quantity",
        type: "input",
        message: "How many units of this item would you wish to buy?"
      })
      .then(function(answer) {
        console.log(answer.quantity);
        connection.query("SELECT * FROM products WHERE ?", { stock_quantity: answer.quantity }, function(err, res) {
          if (err) throw err;
          if(answer.quantity > stock_quantity){
            console.log("Insufficient items! Please try again later!");
            connection.end();
          }
          else{
            console.log("You have been billed for the following item. Thank  you for shopping with us ");
            console.log(
            "Item ID: " +
              res[0].item_id +
              " || Product's Name: " +
              res[0].product_name +
              " || Department's Name: " +
              res[0].department_name +
              " || Price: " +
              res[0].price +
              " || Quantity: " +
              quantity
              );
              res[0].stock_quantity = res[0].stock_quantity - quantity;
            }
          runSearch();
        });
      });
  }

  