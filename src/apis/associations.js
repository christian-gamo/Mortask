import User from "./models/user.model.js";
import TodoList from "./models/todoList.model.js";
import TodoItem from "./models/todoItem.model.js";
import TodoListMembers from "./models/todoList_members.model.js";

export default function associationsInit() {

  // Association Many to Many TodoList User
  TodoList.belongsToMany(User, {
    through: TodoListMembers,
    foreignKey: "todoList_id",
  });
  User.belongsToMany(TodoList, {
    through: TodoListMembers,
    foreignKey: "user_id",
  });

  // Association Many to One TodoList TodoItem
  TodoList.hasMany(TodoItem, { foreignKey: "todoList_id" });
  TodoItem.belongsTo(TodoList, { foreignKey: "todoList_id" });

  // Association Many to One User TodoItem
  User.hasMany(TodoItem, { foreignKey: "todoItem_assigned" });
  TodoItem.belongsTo(User, { foreignKey: "todoItem_assigned" });
}
