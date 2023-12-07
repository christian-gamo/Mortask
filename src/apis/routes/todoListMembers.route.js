import express from "express";
import TodoList from "../models/todoList.model.js";
import User from "../models/user.model.js";
import TodoListMembers from "../models/todoList_members.model.js";

const routerTodoListMembers = express.Router();

const getAllTodoListsMembers = async (req, res) => {
  try {
    const data = await TodoListMembers.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



routerTodoList.get("/", getAllTodoListsMembers);
export default routerTodoListMembers;
