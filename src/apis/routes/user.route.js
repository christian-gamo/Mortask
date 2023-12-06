import express from "express";
import User from "../models/user.model.js";
import cors from "cors";

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

const getUserById = (req, res) => {
  User.findByPk(req.params.user_id).then((user) => res.json(user));
};

routerUser.get("/", getAllUsers);
routerUser.get("/:user_id", getUserById);

export default routerUser;
