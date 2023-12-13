const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
// Import your code generation utility

router.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const userData = {
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
        };
        res.json(userData);
      } else {
        return res.status(400).json({ message: "Login Failed" });
      }
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
