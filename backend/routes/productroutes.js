const { ProductModel } = require("../model/productmodel.js");

const express = require("express");

const productrouter = express.Router();

const { authenticate } = require("../middleware/authenticate.js");

productrouter.use(authenticate);

productrouter.get("/products", async (req, res) => {
  const { query } = req.query;

  try {
    const data = await ProductModel.find({ query });

    res.send(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

productrouter.post("/products/add", async (req, res) => {
  try {
    const data = req.body;
    const adata = await new ProductModel(data);
    adata.save();
    res.send("data added successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

productrouter.patch("/products/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    const data = await ProductModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send("data updated successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

productrouter.delete("/products/delete/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    const data = await ProductModel.findByIdAndDelete({ _id: ID });
    res.send("data deleted successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = {
  productrouter,
};
