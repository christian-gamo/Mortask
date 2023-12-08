import express from "express";
import sequelize from "./db.js";
import cors from "cors";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import routerUser from "./routes/user.route.js";
import routerAuth from "./routes/auth.route.js";
import routerTodoList from "./routes/todoList.route.js";
import routerToDoTask from "./routes/todoTask.route.js";
import routerTodoListMembers from "./routes/todoListMembers.route.js";
import associations from "./associations.js";
import session from "express-session";
import User from "./models/user.model.js";

const app = express();
const port = 2020;

associations();
// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database and tables synced");
});

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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
app.use("/auth", routerAuth);
app.use("/todoList", routerTodoList);
app.use("/todoTask", routerToDoTask);
app.use("/todoListMembers", routerTodoListMembers);

//app.use("/todoListMembers", routeTodoListMembers);

// app.use(
//   session({
//     secret: sessionSecret,
//     resave: true,
//     saveUninitialized: false,
//   })
// );

app.listen(port, () => {
  console.log(`Mortask listening at http://localhost:${port}`);
});
