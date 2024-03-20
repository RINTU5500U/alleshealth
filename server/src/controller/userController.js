const userModel = require("../models/userModel");
const textModel = require("../models/textModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  userLogin : async (req, res) => {
      try {
          if (!req.body.email || !req.body.password) {
            return res.status(400).send({ message: "Content can not be empty!"});
          }

          const { email, password } = req.body;

          const user = await userModel.findOne({email});

          if (!user) { 
            return res.json({ success: false, message: "Invalid email or password."});
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return res.status.json({ success: false, message: "Invalid email or password."});
          }

          const token = jwt.sign({ userId: user._id, email: user.email }, "your_secret_key", { expiresIn: "24h" });
          
          res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});

          return res.status(200).json({ success: true, message: "Login successful.", userAuth: true});
      } catch (error) {
          console.error("Error during user login:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
      }
  },

  userRegister : async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!email || !password || !username) {
          return res.status(400).send({ message: "Content can not be empty!"});
        }
        const user = await userModel.findOne({email});

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
  },

  createText : async (req, res) => {
    try {
        const { userId } = req.decodedToken;
        const text = await textModel.create({ userId: userId, text: req.body.text });

        if (text) {
          return res.status(201).send({ message: "Text created successfully!", success: true});
        }
    } catch (error) {
        return res.status(500).send({ message: error.message || "Some error occurred while creating the text."});
    }
  },

  getText : async (req, res) => {
    try {
      const { userId } = req.decodedToken;
      const text = await textModel.find({userId: userId});
      console.log(text);
      if (text) {
        return res.status(201).send({ message: "Text created successfully!", success: true, text: text});
      }
      return res.json({ message: "Some error occurred while creating the text.", success: false});
    } catch (error) {
      res.status(500).send({ message: error.message || "Some error occurred while creating the text."});
    }
  }

}
