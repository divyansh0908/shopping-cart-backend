const controller = require("../Controller/cart.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/cart", controller.getCart);
    app.post("/api/cart", controller.addToCart);
    app.put("/api/cart/:productId/:quantity", controller.updateCart);
    app.delete("/api/cart/:cartId", controller.deleteFromCart);
}