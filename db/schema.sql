DROP DATABASE IF EXISTS starwars_db;
CREATE DATABASE starwars_db;

USE starwars_db;

CREATE TABLE era (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    era_id INT UNSIGNED NOT NULL,
    INDEX era_ind (era_id), 
    CONSTRAINT fk_era FOREIGN KEY(era_id) REFERENCES era(id) ON DELETE CASCADE
);

CREATE TABLE jedi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE,
    master_id INT UNSIGNED,
    INDEX mas_ind (master_id),
    CONSTRAINT fk_master FOREIGN KEY(master_id) REFERENCES jedi(id) ON DELETE SET NULL 
);