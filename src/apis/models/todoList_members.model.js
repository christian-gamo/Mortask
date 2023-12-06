import DataTypes from "sequelize";
import sequelize from "../db.js";

const TodoListMembers = sequelize.define('TodoListMembers', {
  todoList_members_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  todoList_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, 
{
  tableName: 'todoList_members',
});

export default TodoListMembers;
