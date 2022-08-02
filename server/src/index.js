const express = require('express');
const auth = require("./middleware/auth");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors());


const userController = require('./controllers/user.controllers');
const productController = require("./controllers/product.controller")




// User Controller login Signup
app.use("/", userController);
app.use("/products", productController);



module.exports = app;