import express from "express";
import TodoItem from "../models/todoItem.model.js";

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


routerToDoItem.get("/", getAllToDoItems);

export default routerToDoItem;
