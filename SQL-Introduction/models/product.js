// const db = require("../util/database")
// const Cart = require("./cart");


// module.exports =  class Product{
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     };

//     // (?, ?, ?, ?) => placeholders (or parameter markers).
//     // To prevent SQL injection.
//     // Placeholders make MySQL treat values as data, not SQL
//     save() {
//         return db.execute("INSERT INTO user_products (title, price, imageUrl, descript) VALUES (?, ?, ?, ?)", [this.title, this.price, this.imageUrl, this.description]);
//     };

//     static deleteById(id) {
       
//     };

//     static fetchAll() {
//        return db.execute("SELECT * FROM user_products");
//     };
//     static findById(id) {
//         return db.execute("SELECT * FROM user_products WHERE user_products.id = ?", [id]);
//     }
// }

const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
});

module.exports = Product;