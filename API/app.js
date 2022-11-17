const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");


app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin", `http://localhost:3000`);
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

var corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

//configurations des routes

//création des middlewares

app.use(helmet());
app.use(express.json());
app.use(cookieParser());


module.exports = app ;

