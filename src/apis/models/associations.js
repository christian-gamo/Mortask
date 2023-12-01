import User from "./models/user.model.js";
import Group from "./models/group.model.js";
import TodoList from "./models/todoList.model.js";
import TodoItem from "./models/todoItem.model.js";
import GroupMember from "./models/group_member.model.js";

User.hasMany(Group, { foreignKey: "user_id" });
User.hasMany(GroupMember, { foreignKey: "user_id" });
User.hasMany(TodoItem, { foreignKey: "todoItem_assigned" });
Group.belongsTo(User, { foreignKey: "user_id" });
Group.hasMany(GroupMember, { foreignKey: "group_id" });
GroupMember.belongsTo(Group, { foreignKey: "group_id" });
GroupMember.belongsTo(User, { foreignKey: "user_id" });
TodoList.hasMany(TodoItem, { foreignKey: "todoList_id" });
TodoList.belongsTo(Group, { foreignKey: "group_id" });
TodoItem.belongsTo(User, { foreignKey: "todoItem_assigned" });
TodoItem.belongsTo(TodoList, { foreignKey: "todoList_id" });