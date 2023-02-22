const { connection } = require("./config/db.js");

const express = require("express");

const { userrouter } = require("./routes/userroutes.js");

const { productrouter } = require("./routes/productroutes.js");

const { cartrouter } = require("./routes/cartroutes.js");

require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is Homepage");
});

app.use(userrouter);

app.use(productrouter);

app.use(cartrouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("running at env Port");
});
