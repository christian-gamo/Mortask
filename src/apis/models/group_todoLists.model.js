import { DataTypes } from 'sequelize';
import sequelize from "../db.js";

const GroupTodoLists = sequelize.define('GroupTodoLists', {
  group_todolists_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  todoList_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, 
{
  tableName: 'group_todolists',
});

export default GroupTodoLists;