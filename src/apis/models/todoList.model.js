import DataTypes from "sequelize";
import sequelize from "../db.js";

const TodoList = sequelize.define('TodoList', {
  todoList_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  todoList_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  todoList_description: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '',
  },
  todoList_creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  todoList_isShared: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, 
{
  tableName: 'todoList',
});

export default TodoList;
