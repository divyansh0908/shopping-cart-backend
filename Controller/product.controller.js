const db = require("../Model");
const Product = db.product;


// Create and Save a new Product
exports.addProduct = (req, res, next) => {
    console.log(req.file);
    // console.log(req.body);
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Product
    const product = new Product({
        name: req.body.name,
        image: req.file.path,
        description: req.body.description,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice
    });

    // Save Product in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

exports.getProducts = (req, res) => {
    Product.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
}

