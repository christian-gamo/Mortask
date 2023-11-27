import express from "express";
import sequelize from "./db.js";
import cors from "cors";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import routerUser from "./routes/user.route.js";
import routerAuth from "./routes/auth.route.js";
import routerGroup from "./routes/group.route.js";
import routerTodoList from "./routes/todoList.route.js";
import routerToDoItem from "./routes/todoItem.route.js";

const app = express();
const port = 2020;

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

import User from "./models/user.model.js";
import Group from "./models/group.model.js";
import TodoList from "./models/todoList.model.js";
import TodoItem from "./models/todoItem.model.js";
import routerGroupMember from "./routes/group_member.model.js";
import GroupMember from "./models/group_member.model.js";
// Initialize Passport JWT Strategy for authentication
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "MBOD@CDT2023",
    },
    (payload, done) => {
      User.findByPk(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log("Error in finding user by ID in JWT.");
        });
    }
  )
);

app.use(passport.initialize());

app.use("/users", routerUser);
app.use("/group", routerGroup);
app.use("/auth", routerAuth);
app.use("/todoList", routerTodoList);
app.use("/todoItem", routerToDoItem);
app.use("/groupMember", routerGroupMember);

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

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database and tables synced");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
