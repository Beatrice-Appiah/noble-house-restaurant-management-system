DROP DATABASE IF EXISTS noble_house_rms;
CREATE DATABASE noble_house_rms;
USE noble_house_rms;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50)
);

INSERT INTO users (username, password)
VALUES ('admin', 'admin123');

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(100),
    quantity INT,
    price DECIMAL(10,2)
);

CREATE TABLE inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(100),
    quantity INT
);