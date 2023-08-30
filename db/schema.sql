DROP DATABASE IF EXISTS starwars_db;
CREATE DATABASE starwars_db;

USE starwars_db;

CREATE TABLE era (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    era_id INT, 
    FOREIGN KEY(era_id) 
    REFERENCES era(id)
    ON DELETE SET NULL
);

CREATE TABLE jedi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    master_id INT,
    FOREIGN KEY(role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL 
);