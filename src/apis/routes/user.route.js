import express from "express";
import User from "../models/user.model.js";

const routerUser = express.Router();

const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

routerUser.get("/", getAllUsers);



export default routerUser;
