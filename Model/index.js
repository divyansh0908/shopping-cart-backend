const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.product = require("./product.model.js");
db.cart = require("./cart.model.js");

module.exports = db;