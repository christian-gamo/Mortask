import express from "express";
import TodoList from "../models/todoList.model.js";
import User from "../models/user.model.js";
import TodoListMembers from "../models/todoList_members.model.js";

const routerTodoList = express.Router();

const getAllTodoLists = async (req, res) => {
  try {
    const data = await TodoList.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTodoList = async (req, res) => {
  const todoList_name = req.body.todoList_name;
  const todoList_description = req.body.todoList_description;
  const todoList_creator = req.body.todoList_creator;
  const todoList_isShared = false;
  console.log("AAAAAAAAAAAAA");
  try {
    const todoList = await TodoList.create({
      todoList_name,
      todoList_description,
      todoList_creator,
      todoList_isShared,
    });
    const creator = await User.findByPk(todoList_creator);

    await creator.addTodoList(todoList);

    return res.status(201).json(todoList);
  } catch (error) {
    console.error("Error while creating todoList:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// SELECT tl.*
// FROM todoList tl
// JOIN `group` g ON tl.`group_id` = g.`group_id`
// JOIN group_members gm ON g.`group_id` = gm.`group_id`
//  WHERE gm.`user_id` = 5;
const getAllPrivateTodosByID = async (req, res) => {
  await await TodoList.findAll({
    // je comprend pas sequalize deuxinner join
  });
};

routerTodoList.get("/", getAllTodoLists);
routerTodoList.post("/create", createTodoList);
routerTodoList.get("/privateTodosForUser", getAllPrivateTodosByID);

export default routerTodoList;
