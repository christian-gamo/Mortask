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
  try {
    const todoList = await TodoList.create({
      todoList_name,
      todoList_description,
      todoList_creator,
      todoList_isShared,
    });
    const creator = await User.findByPk(todoList_creator);

    await creator.addTodoList(todoList);

    return res.status(201).json(creator);
  } catch (error) {
    console.error("Error while creating todoList:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getListById = (req, res) => {
  TodoList.findByPk(req.params.todoList_id).then((todoList) =>
    res.json(todoList)
  );
};

const deleteTodoList = async (req, res) => {
  const todoListId = req.body.todoList_id;

  try {
    const todoList = await TodoList.findOne({
      where: { todoList_id: todoListId },
    });

    if (!todoList) {
      return res.status(404).json({ error: "TodoList not found" });
    }

    await todoList.destroy();

    return res.status(200).json({ message: "TodoList deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const editTodoList = async (req, res) => {
  const todoListId = req.body.todoList_id;
  const { todoList_name, todoList_description } = req.body;

  try {
    const todoList = await TodoList.findOne({
      where: { todoList_id: todoListId },
    });

    if (!todoList) {
      return res.status(404).json({ error: "TodoList not found" });
    }

    if (todoList_name) {
      todoList.todoList_name = todoList_name;
    }
    if (todoList_description) {
      todoList.todoList_description = todoList_description;
    }

    await todoList.save();

    return res.status(200).json({ message: "TodoList updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPrivateTodosByID = async (req, res) => {
  const userId = req.params.user_id;
  try {
    const todoLists = await TodoList.findAll({
      attributes: [
        "todoList_id",
        "todoList_name",
        "todoList_description",
        "todoList_creator",
        "todoList_isShared",
      ],
      include: {
        model: User,
        attributes: [],
        where: { user_id: userId },
      },
      where: { todoList_isShared: false },
    });

    res.json(todoLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPublicTodosByID = async (req, res) => {
  const userId = req.params.user_id;
  try {
    const todoLists = await TodoList.findAll({
      attributes: [
        "todoList_id",
        "todoList_name",
        "todoList_description",
        "todoList_creator",
        "todoList_isShared",
      ],
      include: {
        model: User,
        attributes: [],
        where: { user_id: userId },
      },
      where: { todoList_isShared: true },
    });

    res.json(todoLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

routerTodoList.get("/", getAllTodoLists);
routerTodoList.get("/:todoList_id", getListById);
routerTodoList.post("/create", createTodoList);
routerTodoList.post("/edit", editTodoList);
routerTodoList.post("/delete", deleteTodoList);
routerTodoList.get("/privateTodosForUser/:user_id", getAllPrivateTodosByID);
routerTodoList.get("/publicTodosForUser/:user_id", getAllPublicTodosByID);

export default routerTodoList;
