import express from "express";
import User from "../models/user.model.js";
import cors from "cors";
import TodoListMembers from "../models/todoList_members.model.js";
import TodoList from "../models/todoList.model.js";

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

const editUser = async (req, res) => {
  const userId = req.body.user_id;

  const { user_fname, user_lname, user_email, user_password, user_status } =
    req.body;

  try {
    const user = await User.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user_fname) {
      user.user_fname = user_fname;
    }
    if (user_lname) {
      user.user_lname = user_lname;
    }
    if (user_email) {
      user.user_email = user_email;
    }
    if (user_password) {
      user.user_password = user_password;
    }
    if (user_status !== undefined) {
      user.user_status = user_status;
    }

    await user.save();

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.body.user_id;

  try {
    const user = await User.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

routerUser.get("/", getAllUsers);
routerUser.get("/delete", deleteUser);
routerUser.get("/edit", editUser);
routerUser.get("/:user_id", getUserById);

export default routerUser;
