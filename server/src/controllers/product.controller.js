
const express = require("express");
const router = express.Router();
const Product = require("../model/user");
const authorization = require("../middleware/auth");
const { admin, manager, staff } = require("../Utils/constants");



//only manager and admin has access to get all products
router.get("/",authorization([admin,manager]), async (req, res) => {
  try {
    const products = await Product.find({}).lean().exec();
    res.status(200).json({ products });
  } catch (error) {
    return res.status(500).send({message: error.message});
  }
});

//only admin has access to create a product
router.post("/",authorization([admin]), async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).json({ products });
  } catch (error) {
    return res.status(500).send({message: error.message});
  }
});

//both manager and admin has access to update products
router.patch("/:id", authorization([admin,manager]), async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id);
        res.status(204).json({ products });
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
  }
);

router.delete("/:id", authorization([admin]), async (req, res) => {
    try {
        const products = await Product.findByIdAndUpdate(req.params.id);
        res.status(204).json({ products });
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
  }
);

module.exports = router;