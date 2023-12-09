import express from "express";
import TodoList from "../models/todoList.model.js";
import TodoTask from "../models/todoTask.model.js";
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

const getMembersByTodoListId = async (req, res) => {
  const todoListId = req.body.todoList_id;
  try {
    const todoListMembers = await TodoListMembers.findAll({
      include: { model: User, attributes: []},
      where: { todoList_id: todoListId }
    });

    res.json(todoListMembers);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todoList members" });
  }
};

const addMemberToTodoList = async (req, res) => {

  const memberId  = req.body.user_id; 
  const todoListId  = req.body.todoList_id;

  try {
    const todoListMember = await TodoListMembers.create({
      todoList_id: todoListId,
      user_id: memberId,
    });

    const member = await User.findByPk(memberId);
    const todoList = await TodoList.findByPk(todoListId);

    await member.addTodoList(todoList);
    if(!todoList.todoList_isShared){
      todoList.todoList_isShared = true;
    }
    todoList.save();

    return res.status(200).json(todoListMember);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const removeMemberFromTodoList = async (req, res) => {

  const memberId  = req.body.user_id; 
  const todoListId  = req.body.todoList_id;

  try {

    const member = await User.findByPk(memberId);
    const todoList = await TodoList.findByPk(todoListId);

    const todoTasks = await TodoTask.findAll({
      where: {
        todoTask_assigned: memberId,
      },
      include: {
        model: TodoList,
      },
    });

    const creator = await User.findByPk(todoList.todoList_creator)
    
    for (const todoTask of todoTasks) {
      todoTask.todoTask_assigned = creator.user_id;
      await todoTask.save();
    }

    await member.removeTodoList(todoList);

    return res.status(200).json(member);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

routerTodoListMembers.get("/", getAllTodoListsMembers);
routerTodoListMembers.get("/getMembersByTodoListId", getMembersByTodoListId);
routerTodoListMembers.get("/addUserToTodoList", addMemberToTodoList);
routerTodoListMembers.get("/removeUserFromTodoList", removeMemberFromTodoList);
export default routerTodoListMembers;
