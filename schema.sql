DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT(30) NULL,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(60),
  price DECIMAL(10, 10),
  stock_quantity INT(20),
  PRIMARY KEY (id)
);

SELECT * FROM products;
