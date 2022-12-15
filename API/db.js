const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(error => {
    if(error){
        console.log(error);
    }
    console.log("The connection is a success.")
});

module.exports = connection;