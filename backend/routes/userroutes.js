const express = require("express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const userrouter = express.Router();

const { UserModel } = require("../model/usermodel");

userrouter.post("/users/register", async (req, res) => {
  const { name, email, gender, password, age } = req.body;

  const check = await UserModel.find({ email: email });
  if (check.length > 0) {
    res.send("User already exist,please login");
  } else {
    bcrypt.hash(password, 4, async (err, safe_pass) => {
      if (err) {
        console.log(err);
      } else {
        const data = await new UserModel({
          name,
          email,
          gender,
          password: safe_pass,
          age,
        });
        data.save();
        res.send("data registered successfully");
      }
    });
  }
});

userrouter.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email: email });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ course: "backend" }, "masai");

          res.send({ msg: "login successful", token: token });
        } else {
          res.send("wrong credentials");
        }
      });
    } else {
      res.send("wrong credentials");
    }
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
});

module.exports = {
  userrouter,
};
