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

// création des routes

var categoryRoutes = require("./routes/category.routes.js");
var companyRoutes = require("./routes/company.routes.js");
var noticeRoutes = require("./routes/notice.routes.js");
var productRoutes = require("./routes/product.routes.js");
var roleRoutes = require("./routes/role.routes.js");
var userRoutes = require("./routes/user.routes.js");

//configurations des routes
app.use("api/category", categoryRoutes);
app.use("api/company", companyRoutes);
app.use("api/notice", noticeRoutes);
app.use("api/product", productRoutes);
app.use("api/role", roleRoutes);
app.use("api/user", userRoutes);

//création des middlewares

app.use(helmet());
app.use(express.json());
app.use(cookieParser());


module.exports = app ;

