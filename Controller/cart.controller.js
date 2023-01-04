const db = require("../Model");
const Product = db.product;
const Cart = db.cart;

exports.addToCart = (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  console.log(productId, quantity);
  // Check if product exists in cart already
  Cart.findOne({ product: productId })
    .then((data) => {
      if (data) {
        // If product exists in cart, update quantity
        Cart.findOneAndUpdate(
          { product: productId },
          { $set: { quantity: quantity } },
          { new: true }
        )
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while updating cart.",
            });
          });
      } else {
        // If product does not exist in cart, add product to cart
        const cart = new Cart({
          product: productId,
          quantity: quantity,
        });
        cart
          .save(cart)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while adding to cart.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding to cart.",
      });
    });
  // Create a Cart
};
exports.updateCart = (req, res) => {
  const productId = req.params.productId;
  const quantity = req.params.quantity;
  console.log(productId, quantity);
  // Cart.findOne({ "product": productId })
  //     .then(data => {

  Cart.findOneAndUpdate(
    { product: productId },
    { $set: { quantity: quantity } },
    { new: true }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating cart.",
      });
    });
};
exports.getCart = async (req, res) => {
  let cart = [];
  const data = await Cart.find();
    for (let i = 0; i < data.length; i++) {
        const product = await Product.findById(data[i].product);
        cart.push({
          id: data[i]._id,
            product: product,
            quantity: data[i].quantity
        })
    }
    // console.log(cart);
    res.send(cart);


    
};
exports.deleteFromCart = (req, res) => {
  const id = req.params.cartId;
  Cart.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`,
        });
      } else {
        res.send({
          message: "Cart was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Cart with id=" + id,
      });
    });
};
