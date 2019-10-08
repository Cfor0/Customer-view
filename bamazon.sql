DROP DATABASE IF EXISTS amazonDB;

CREATE DATABASE amazonDB;

USE amazonDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    department VARCHAR(100),
    price INT(10, 2)  NULL,
    quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products(title, department, price, quantity)
VALUES ("samurai sword", "weapons", 800, 5), ("laptop", "electronics", 1200, 9), ("shirt", "clothes", 19.99, 60),
("rare coin", "coins", 299.99, 3), ("broken axe", "weapon", 55, 1), ("glasses", "eyewear", 80, 4),
("tire", "cars", 100, 4), ("iphone", "electronics", 599.99, 1),("nerf gun", "toys", 19.99, 6),
("Call of Duty", "video games", 59.99, 1);

select * from products;
