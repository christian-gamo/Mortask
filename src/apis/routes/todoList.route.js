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

const getAllPrivateTodosByID = async (req, res) => {
  const userId = req.body.user_id;
  try {
    const todoLists = await TodoList.findAll({
      attributes: [
        "todoList_id",
        "todoList_name",
        "todoList_description",
        "todoList_creator",
        "todoList_isShared",
      ],
      include: [
        {
          model: TodoListMembers,
          attributes: [],
          where: { user_id: userId },
        },
        {
          model: User,
          attributes: [],
          where: { user_id: userId },
        },
      ],
      where: { todoList_isShared: false },
    });

    res.json(todoLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPublicTodosByID = async (req, res) => {
  const userId = req.body.user_id;
  try {
    const todoLists = await TodoList.findAll({
      attributes: [
        "todoList_id",
        "todoList_name",
        "todoList_description",
        "todoList_creator",
        "todoList_isShared",
      ],
      include: [
        {
          model: TodoListMembers,
          attributes: [],
          where: { user_id: userId },
        },
        {
          model: User,
          attributes: [],
          where: { user_id: userId },
        },
      ],
      where: { todoList_isShared: true },
    });

    res.json(todoLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

routerTodoList.get("/", getAllTodoLists);
routerTodoList.post("/create", createTodoList);
routerTodoList.get("/privateTodosForUser", getAllPrivateTodosByID);
routerTodoList.get("/publicTodosForUser", getAllPublicTodosByID);

export default routerTodoList;
