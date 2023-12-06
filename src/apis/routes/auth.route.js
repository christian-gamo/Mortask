import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

// Initialize the router
const routerAuth = express.Router();

// Functions
function login(req, res) {
  const email = req.body.user_email;
  const password = req.body.user_password;
  if (email && password) {
    User.findOne({ where: { user_email: email } })
      .then(async (user) => {
        if (!user) {
          res.status(401).json({ message: "Incorrect username or password." });
          return;
        }

        if (await bcrypt.compare(password.trim(), user.user_password)) {
          let payload = { id: user.user_id };
          let token = jwt.sign(payload, "MBOD@CDT2023");

          res.json({ message: "Success", token: token, user_id: user.user_id });
          req.session.userId = user.user_id;

          return;
        } else {
          res.status(401).json({ message: "Incorrect username or password." });
          return;
        }
      })
      .catch(() =>
        res.status(401).json({ message: "Incorrect username or password." })
      );
  }
}

async function signup(req, res) {
  try {
    // check if the user already exists
    const email = req.body.user_email;
    const existingUser = await User.findOne({ where: { user_email: email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.user_password, salt, function (err, hash) {
        User.create({
          user_fname: req.body.user_fname,
          user_lname: req.body.user_lname,
          user_email: req.body.user_email,
          user_password: hash,
          user_status: req.body.user_status,
        }).then((note) => res.status(201).json(note));
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
}

// Routes
routerAuth.post("/login", login);
routerAuth.post("/signup", signup);

export default routerAuth;
