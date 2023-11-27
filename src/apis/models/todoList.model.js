import DataTypes from "sequelize";
import sequelize from "../db.js";

const TodoList = sequelize.define(
  "TodoList",
  {
    todoList_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    todoList_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    todoList_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    todoList_private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "todoList" }
);

export default TodoList;
