const express = require("express");
const app = express();


app.set("view engine", "ejs");
app.set("views", "views");
// This will tell express that we want to compile dynamic templates with the pug engine and where to find these template
// app.set("view engine", "pug");
// app.set("views", "views");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
const adminRoutes = require("./routes/admin")
const shopRoute = require("./routes/shop");
const path = require("path");


const errorController = require("./controllers/404");


app.use(express.static(path.join(__dirname, "public")));

// Filtering paths
app.use("/admin", adminRoutes);
app.use(shopRoute);

// catch all routes
app.use(errorController.errorPage);

app.listen(3000);