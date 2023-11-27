import express from "express";
import TodoList from "../models/todoList.model.js";
import User from "../models/user.model.js";
import Group from "../models/group.model.js";
import GroupMember from "../models/group_member.model.js";

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
routerTodoList.get("/privateTodosForUser", getAllPrivateTodosByID);

export default routerTodoList;
