const userModel = require("../models/user.model");
const textModel = require("../models/text.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
          return res.status(400).send({ message: "Content can not be empty!"});
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ where: { email } });

        if (!user) { 
          return res.json({ success: false, message: "Invalid email or password."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status.json({ success: false, message: "Invalid email or password."});
        }

        const token = jwt.sign({ id: user.id, email: user.email }, "your_secret_key", { expiresIn: "24h" });
        
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});

        return res.status(200).json({ success: true, message: "Login successful.", userAuth: true});
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};
exports.userRegister = async (req, res) => {
  try {

      if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Content can not be empty!"});
      }

      const { username, email, password } = req.body;
      const user = await userModel.findOne({ where: { email: req.body.email}});

      if (user) {
        return res.status(409).send({ message: "User already exists with this mailid ..please try different mail", success: false});
      }
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({ username: username, email: email, password: hashPassword });
      if (newUser) { 
        return res.status(201).send({ message: "User created successfully!", success: true });
      }
      return res.json({ message: "Some error occurred while creating the user.", success: false});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message || "Some error occurred while creating the user." });
  }
};

exports.createText = async (req, res) => {
  try {
      const { id } = req.user;
      const text = await textModel.create({ userId: id, text: req.body.text });

      if (text) {
        return res.status(201).send({ message: "Text created successfully!", success: true});
      }
  } catch (error) {
      return res.status(500).send({ message: error.message || "Some error occurred while creating the text."});
  }
};

exports.getText = async (req, res) => {
  try {
    const { id } = req.user;
    const text = await textModel.findAll({ where: {userId: id}});
    console.log(text);
    if (text) {
      return res.status(201).send({ message: "Text created successfully!", success: true, text: text});
    }
    return res.json({ message: "Some error occurred while creating the text.", success: false});
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while creating the text."});
  }
};
