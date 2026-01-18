const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {pageTitle: "Add product", path: "/admin/add-product", editing: false});
};
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
    .then((result) => {
        console.log("Created Product");
        res.redirect("/admin/products");
    })
    .catch((err) => {
        console.log(err);
    })
    // const product = new Product(null, title, imageUrl, description, price);
    
    // product.save()
    // .then(() => {
    //     res.redirect("/");
    // })
    // .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    req.user.getProducts({where: {id: prodId}})
    // Product.findAll({where: {id: prodId}})
    .then((products) => {
        const product = products[0];
        if (!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product", {pageTitle: "Edit product", path: "/admin/edit-product", editing: editMode, product: product});
    })
    .catch((err) => {
        console.log(err);
    })
    // Product.findById(prodId, product => {
    //     if (!product) {
    //         return res.redirect("/");
    //     }
    //     res.render("admin/edit-product", {pageTitle: "Edit product", path: "/admin/edit-product", editing: editMode, product: product});
    // });
};
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId; 
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product.findAll({where: {id: prodId}})
    .then((product) => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;
        return product.save();
    })
    .then((result) => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
    })
    .catch((err) => {
        console.log(err);
    })
    // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    // updatedProduct.save();
}

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
    .then((products) => {
        res.render("admin/products", {prods: products, pageTitle: "Admin Products", path: "/products"});
    })
    .catch((err) => {
        console.log(err);
    })
    // Product.fetchAll((products) => {
    //     res.render("admin/products", {prods: products, pageTitle: "Admin Products", path: "/products"});
    // });
};

exports.postDeleteProduct =  (req, res, next) => {
    const prodId = req.body.productId;
    const product = Product.findOne(prodId)
    .then(() => {
        return product.destroy();
    })
    .then(() => {
        console.log("DESTROYED PRODUCT!");
        res.redirect("/admin/products")
    })
    .catch((err) => {
        console.log(err);
    })
};