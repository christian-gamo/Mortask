import User from "./models/user.model.js";
import TodoList from "./models/todoList.model.js";
import TodoTask from "./models/todoTask.model.js";
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

  // Association Many to One TodoList TodoTask
  TodoList.hasMany(TodoTask, { foreignKey: "todoList_id", onDelete: 'CASCADE'});
  TodoTask.belongsTo(TodoList, { foreignKey: "todoList_id" });

  // Association Many to One User TodoTask
  User.hasMany(TodoTask, { foreignKey: "todoTask_assigned", onDelete: 'CASCADE'});
  TodoTask.belongsTo(User, { foreignKey: "todoTask_assigned" });
}
