DROP DATABASE IF EXISTS shopproject;
CREATE DATABASE shopproject;
USE shopproject;

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    roleName VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, 
    CHECK(email LIKE '%_@__%.__%'),
    phone VARCHAR(10) NOT NULL,
    enable boolean NOT NULL,
    CHECK (phone regexp '^[0-9]{10}$'),
    password VARCHAR(255) NOT NULL,
    role int,
    FOREIGN KEY (role) REFERENCES roles(id)
);

CREATE TABLE companies (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    place VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    CHECK(email LIKE '%_@__%.__%')
);


CREATE TABLE categories (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    categoryName VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    productName VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR(1000) NOT NULL,
    companyId INT,
    FOREIGN KEY (companyId) REFERENCES companies(id),
    categoryId INT,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

CREATE TABLE notices (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    message VARCHAR(500) NOT NULL,
    productId INT,
    FOREIGN KEY (productId) REFERENCES products(id),
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id),
    mark INT NOT NULL
);
