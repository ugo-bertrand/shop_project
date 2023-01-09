const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", `http://localhost:8080`);
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

var corsOption = {
    origin:"http://localhost:8080"
};

app.use(cors(corsOption));

var roleRoutes = require("./routes/role.routes.js");
var userRoutes = require("./routes/user.routes.js");
var companyRoutes = require("./routes/company.routes.js");
var categoryRoutes = require("./routes/role.routes.js");


app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;