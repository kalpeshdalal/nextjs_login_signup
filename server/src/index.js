const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const Joi = require("joi");
const User = require("./models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 4001;

dotenv.config();
const url = process.env.MONGODB_URL;
console.log(url);

const signupValidationMiddleware = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
const loginValidationMiddleware = (req, res, next) => {
  console.log("hiii");
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

app.post("/signup", signupValidationMiddleware, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.send({ message: "Email already exists" });
    }
    const user = new User({ email, password, name });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.send({ message: "Internal Server Error" });
  }
});
app.post("/login", loginValidationMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send({ message: "User does not exist" });
    }
  
    const passwordMatch = password === user.password;
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.send({ message: "Incorrect password" });
    }
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.error(error);
    res.send({ error: "Internal Server Error" });
  }
});

app.get("/getallusers", async (req, res) => { 
  console.log("hi");
  try {
    const users = await User.find();
    if (!users || users.length === 0) { 
      return res.status(404).send({ message: "No users exist" }); 
    }
    res.status(200).send({ message: "These are all the users:", users: users }); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" }); 
  }
});


app.listen(port, () => {
  try {
    mongoose.connect(url);
    console.log(`server is running on port ${port}`);
  } catch {
    console.log("Error connecting to MongoDB");
  }
});
