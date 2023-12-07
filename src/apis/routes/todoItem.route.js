import express from "express";
import TodoItem from "../models/todoItem.model.js";
import TodoList from "../models/todoList.model.js";

const routerToDoItem = express.Router();

const getAllToDoItems = async (req, res) => {
  try {
    const data = await TodoItem.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTodoItem = async (req, res) => {
  const todoItem_name = req.body.todoItem_name;
  const todoItem_description = req.body.todoItem_description;
  const todoItem_tag = req.body.todoItem_tag;
  const todoItem_deadline = req.body.todoItem_deadline;
  const todoItem_status = req.body.todoItem_status;
  const todoList_id = req.body.todoList_id;
  const todoItem_assigned = req.body.todoItem_assigned_user;

  try {
    const todoItem = await TodoItem.create({
      todoItem_name,
      todoItem_description,
      todoItem_tag,
      todoItem_deadline,
      todoItem_status,
      todoList_id,
      todoItem_assigned,
    });

    return res.status(201).json(todoItem);
  } catch (error) {
    console.error("Error while creating todoItem:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const assignUser = async (req, res) => {
  const todoItemId  = req.body.todoItem_id;
  const userId = req.body.user_id;

  try {
    const todoItem = await TodoItem.findByPk(todoItemId);
    if (!todoItem) {
      return res.status(404).json({ error: 'todoList not found' });
    }
    const user = await User.findByPk(userId);
    todoItem.addUser(user);

    return res.json({todoItem});
  } 
  catch (error) {
    console.error('Error :', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getItemsOfList = (req, res) => {
  const todoListId = req.params.todoList_id;

  TodoItem.findAll({
    where: { todoList_id: todoListId },
  })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

routerToDoItem.get("/", getAllToDoItems);
routerToDoItem.get("/:todoList_id", getItemsOfList);
routerToDoItem.post("/create", createTodoItem);

export default routerToDoItem;
