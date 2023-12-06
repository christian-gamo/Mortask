import User from "./models/user.model.js";
import Group from "./models/group.model.js";
import TodoList from "./models/todoList.model.js";
import TodoItem from "./models/todoItem.model.js";
import GroupMembers from "./models/group_members.model.js";
import GroupTodoLists from "./models/group_todoLists.model.js"

export default function associationsInit(){
    User.belongsToMany(Group, {through: GroupMembers });
    Group.belongsToMany(User, {through: GroupMembers} );
    
    User.hasMany(Group,{foreignKey: 'group_master'});
    Group.belongsTo(User);
    
    TodoList.hasMany(TodoItem,{foreignKey: 'todoList_id'});
    TodoItem.belongsTo(TodoList);
    
    User.hasMany(TodoList,{foreignKey: 'todoList_creator'});
    TodoList.belongsTo(User);
    
    TodoList.hasMany(TodoItem, {foreignKey: 'todoList_id',});
    TodoItem.belongsTo(TodoList);
    
    User.hasMany(TodoItem,{foreignKey: 'todoItem_assigned_user'});
    TodoItem.belongsTo(User);
    
    TodoList.belongsToMany(Group, {through: GroupTodoLists });
    Group.belongsToMany(TodoList, {through: GroupTodoLists} );
}
