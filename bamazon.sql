DROP DATABASE IF EXISTS amazonDB;

CREATE DATABASE amazonDB;

USE amazonDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    department VARCHAR(100),
    price INT(10, 2)  NULL,
    quantity INT NULL,
    PRIMARY KEY (id)
);

