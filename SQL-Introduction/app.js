const express = require("express");
const app = express();
const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");


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


app.use((req, res, next) => {
    User.findOne()
    .then((user) => {
        req.user = user;
        next();
    })
    .catch((err) => {
        console.log(err)
    })
});
// Filtering paths
app.use("/admin", adminRoutes);
app.use(shopRoute);

// catch all routes
app.use(errorController.errorPage);

// Relating modules
Product.belongsTo(User, {constraint: true, onDelete: "CASCADE"});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
// sequelize.sync({force: true})
.sync()
.then((result) => {
    return User.findOne()
    // console.log(result);
})
.then((user) => {
    if (!user) {
        User.create({
            name: "Stephen",
            email: "test@gmail.com"
        });
    }
    return user;
})
.then((user) => {
    // console.log(user);
    return user.createCart();
    
})
.then((cart) => {
    app.listen(3000);    
})
.catch((err) => {
    console.log(err);
})
