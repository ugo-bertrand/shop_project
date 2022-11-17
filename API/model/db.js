const mysql = require("mysql2");

const dbConfig = require("../config/config.db.js");

//création de la connexion à la base de données

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//ouvrir la connexion

connection.connect(error =>{
    if(error){
        console.log("Une erreur est survenue lors de la connexion à la base de données");
        console.log("Error : " + error);
    }
    else{
        console.log("La connexion à la base de données est un succès");
    }
});

module.exports= connection ;