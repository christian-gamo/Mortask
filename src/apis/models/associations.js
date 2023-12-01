import User from "./models/user.model.js";
import Group from "./models/group.model.js";
import TodoList from "./models/todoList.model.js";
import TodoItem from "./models/todoItem.model.js";
import GroupMembers from "./models/group_member.model.js";


User.belongsToMany(Group, {through: GroupMembers });
Group.belongsToMany(User, {through: GroupMembers} );
