import User from "./models/user.model.js";
import Group from "./models/group.model.js";
import TodoList from "./models/todoList.model.js";
import TodoItem from "./models/todoItem.model.js";
import GroupMembers from "./models/todoList_members.model.js";
import GroupTodoLists from "./models/group_todoLists.model.js"

export default function associationsInit(){
    //Association Many to Many Group User 
    User.belongsToMany(Group, {through: GroupMembers });
    Group.belongsToMany(User, {through: GroupMembers} );
    
    //Association Many to One Group User 
    User.hasMany(Group,{foreignKey: 'group_master'});
    Group.belongsTo(User);
    
    //Association Many to One TodoList TodoItem
    TodoList.hasMany(TodoItem,{foreignKey: 'todoList_id'});
    TodoItem.belongsTo(TodoList);
    
     //Association Many to One User TodoList
    User.hasMany(TodoList,{foreignKey: 'todoList_creator'});
    TodoList.belongsTo(User);
    
    //Association Many to One TodoList TodoItem
    TodoList.hasMany(TodoItem, {foreignKey: 'todoList_id',});
    TodoItem.belongsTo(TodoList);
    
    //Association Many to One User TodoItem
    User.hasMany(TodoItem,{foreignKey: 'todoItem_assigned_user'});
    TodoItem.belongsTo(User);
    
    //Association Many to Many TodoList Group
    TodoList.belongsToMany(Group, {through: GroupTodoLists });
    Group.belongsToMany(TodoList, {through: GroupTodoLists} );
}

