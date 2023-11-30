import DataTypes from "sequelize";
import sequelize from "../db.js";

const TodoItem = sequelize.define("TodoItem", {
  todoItem_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  todoItem_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  todoItem_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  todoItem_tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  todoItem_deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  todoItem_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  todoList_id: {
    type: DataTypes.INTEGER,
  },
  todoItem_assigned: {
    type: DataTypes.INTEGER,
  },
});

export default TodoItem;
