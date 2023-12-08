import DataTypes from "sequelize";
import sequelize from "../db.js";

const TodoTask = sequelize.define(
  "TodoTask",
  {
    todoTask_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    todoTask_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    todoTask_description: {
      type: DataTypes.STRING(80),
      allowNull: false,
      defaultValue: ''
    },
    todoTask_tag: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    todoTask_deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    todoTask_status: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    todoList_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    todoTask_assigned: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    todoTask_isImportant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "todoTask",
  }
);

export default TodoTask;
