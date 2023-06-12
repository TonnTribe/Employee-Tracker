const inquirer = require('inquirer');
const mysql = require('mysql2');

require("dotenv").config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: process.env.DB_PW,
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);