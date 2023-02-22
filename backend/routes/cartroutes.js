const { CartModel } = require("../model/cartmodel.js");

const express = require("express");

const cartrouter = express.Router();

const { authenticate } = require("../middleware/authenticate.js");

cartrouter.use(authenticate);

cartrouter.get("/carts", async (req, res) => {
  const { query } = req.query;

  try {
    const data = await CartModel.find({ query });

    res.send(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

cartrouter.post("/carts/add", async (req, res) => {
  try {
    const data = req.body;
    const adata = await new CartModel(data);
    adata.save();
    res.send("data added successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

cartrouter.patch("/carts/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    const data = await CartModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send("data updated successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

cartrouter.delete("/carts/delete/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    const data = await CartModel.findByIdAndDelete({ _id: ID });
    res.send("data deleted successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = {
  cartrouter,
};
