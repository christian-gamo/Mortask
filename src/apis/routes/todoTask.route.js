import express from "express";
import TodoTask from "../models/todoTask.model.js";
import TodoList from "../models/todoList.model.js";
import User from "../models/user.model.js";
import sequelize from "../db.js";
import { Sequelize } from "sequelize";

const routerToDoTask = express.Router();

const getAllToDoTasks = async (req, res) => {
  try {
    const data = await TodoTask.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTodoTask = async (req, res) => {
  const todoTask_name = req.body.todoTask_name;
  const todoTask_description = req.body.todoTask_description;
  const todoTask_tag = req.body.todoTask_tag;
  const todoTask_deadline = req.body.todoTask_deadline;
  const todoTask_status = req.body.todoTask_status;
  const todoList_id = req.body.todoList_id;
  const todoTask_assigned = req.body.todoTask_assigned_user;
  const todoTask_isImportant = req.body.todoTask_isImportant;

  try {
    const todoTask = await TodoTask.create({
      todoTask_name,
      todoTask_description,
      todoTask_tag,
      todoTask_deadline,
      todoTask_status,
      todoList_id,
      todoTask_assigned,
      todoTask_isImportant,
    });

    return res.status(201).json(todoTask);
  } catch (error) {
    console.error("Error while creating todoTask:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTodoTask = async (req, res) => {
  const todoTaskId = req.body.todoTask_id;

  try {
    const todoTask = await TodoTask.findOne({
      where: { todoTask_id: todoTaskId },
    });

    if (!todoTask) {
      return res.status(404).json({ error: "TodoTask not found" });
    }

    await todoTask.destroy();

    return res.status(200).json({ message: "TodoTask deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const editTodoTask = async (req, res) => {
  const todoTaskId = req.body.todoTask_id;
  const todoTask_name = req.body.todoTask_name;
  const todoTask_description = req.body.todoTask_description;
  const todoTask_tag = req.body.todoTask_tag;
  const todoTask_deadline = req.body.todoTask_deadline;
  const todoTask_status = req.body.todoTask_status;
  const todoTask_assigned = req.body.todoTask_assigned_user;
  const todoTask_isImportant = req.body.todoTask_isImportant;

  try {
    const todoTask = await TodoTask.findOne({
      where: { todoTask_id: todoTaskId },
    });

    if (!todoTask) {
      return res.status(404).json({ error: "TodoTask not found" });
    }

    if (todoTask_name) {
      todoTask.todoTask_name = todoTask_name;
    }
    if (todoTask_description) {
      todoTask.todoTask_description = todoTask_description;
    }
    if (todoTask_tag) {
      todoTask.todoTask_tag = todoTask_tag;
    }
    if (todoTask_deadline) {
      todoTask.todoTask_deadline = todoTask_deadline;
    }
    if (todoTask_status) {
      todoTask.todoTask_status = todoTask_status;
    }
    if (todoTask_assigned) {
      todoTask.todoTask_assigned = todoTask_assigned;
    }
    if (todoTask_isImportant !== undefined) {
      todoTask.todoTask_isImportant = todoTask_isImportant;
    }

    await todoTask.save();

    return res.status(200).json({ message: "TodoTask updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTasksOfList = (req, res) => {
  const todoListId = req.params.todoList_id;

  TodoTask.findAll({
    where: { todoList_id: todoListId },
  })
    .then((Tasks) => {
      res.status(200).json(Tasks);
    })
    .catch((error) => {
      console.error("Error fetching Tasks:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getTasksForUser = (req, res) => {
  const todoTask_assigned = req.params.todoTask_assigned;

  TodoTask.findAll({
    where: { todoTask_assigned: todoTask_assigned },
  })
    .then((Tasks) => {
      res.status(200).json(Tasks);
    })
    .catch((error) => {
      console.error("Error fetching Tasks:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getTasksForUserAndToday = async (req, res) => {
  const { user_id } = req.params;

  try {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);

    const tasks = await TodoTask.findAll({
      where: {
        todoTask_assigned: user_id,
        [sequelize.and]: Sequelize.literal(
          `DATE(CONVERT_TZ(TodoTask.todoTask_deadline, '+00:00', '+02:00')) = '${
            today.toISOString().split("T")[0]
          }'`
        ),
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getImportantTasksForUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const importantTasks = await TodoTask.findAll({
      where: {
        todoTask_isImportant: true,
        todoTask_assigned: user_id,
      },
    });

    res.status(200).json(importantTasks);
  } catch (error) {
    console.error(`Error fetching important tasks for user ${user_id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const changeImportantOnClick = async (req, res) => {
  const { todoTask_id } = req.body;

  try {
    const todoTask = await TodoTask.findByPk(todoTask_id);

    if (!todoTask) {
      return res.status(404).json({ error: "TodoTask not found" });
    }

    todoTask.todoTask_isImportant = !todoTask.todoTask_isImportant;

    await todoTask.save();

    res
      .status(200)
      .json({ message: "TodoTask isImportant toggled successfully", todoTask });
  } catch (error) {
    console.error(
      `Error toggling isImportant for todoTask ${todoTask_id}:`,
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

const toggleStatusOnClick = async (req, res) => {
  const { todoTask_id } = req.body;

  try {
    const todoTask = await TodoTask.findByPk(todoTask_id);

    if (!todoTask) {
      return res.status(404).json({ error: "TodoTask not found" });
    }

    todoTask.todoTask_status =
      todoTask.todoTask_status === "pending" ? "completed" : "pending";

    await todoTask.save();

    res
      .status(200)
      .json({ message: "TodoTask status toggled successfully", todoTask });
  } catch (error) {
    console.error(`Error toggling status for todoTask ${todoTask_id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTaskById = async (req, res) => {
  const todoTaskId = req.params.todoTask_id;
  try{
    const task = await TodoTask.findAll({
      where: {todoTask_id: todoTaskId},
      include: {
        model:User
      }
    });
    res.status(200).json(task);
  }
  catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }

};

routerToDoTask.get("/", getAllToDoTasks);
routerToDoTask.get("/task/:todoTask_id", getTaskById);
routerToDoTask.get("/:todoList_id", getTasksOfList);
routerToDoTask.get("/user/:todoTask_assigned", getTasksForUser);
routerToDoTask.get("/importantTasks/:user_id", getImportantTasksForUser);
routerToDoTask.get("/user/:user_id/today", getTasksForUserAndToday);
routerToDoTask.put("/toggleImportant/", changeImportantOnClick);
routerToDoTask.put("/toggleStatus", toggleStatusOnClick);
routerToDoTask.post("/create", createTodoTask);
routerToDoTask.post("/edit", editTodoTask);
routerToDoTask.post("/delete", deleteTodoTask);
//routerToDoTask.post("/assignUser", assignUser);

export default routerToDoTask;
