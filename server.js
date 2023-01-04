require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const path = require("path");
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// make uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./Model");

db.mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "shoppingcart",
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./Route/product.route")(app);
require("./Route/cart.route")(app);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
