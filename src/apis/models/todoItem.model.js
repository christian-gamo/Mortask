import DataTypes from "sequelize";
import sequelize from "../db.js";

const TodoItem = sequelize.define('TodoItem', {
  todoItem_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  todoItem_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  todoItem_description: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  todoItem_tag: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  todoItem_deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  todoItem_status: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  todoList_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  todoItem_assigned_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, 
{
  tableName: 'todoItem',
});


export default TodoItem;
