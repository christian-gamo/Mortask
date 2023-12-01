import DataTypes from "sequelize";
import sequelize from "../db.js";
import Group from "./group.model.js";

const GroupMembers = sequelize.define("group_members",
  {
    group_members_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "group_members" }
);

Group.belongsToMany(User, {through: GroupMembers});
User.belongsToMany(Group, {through: GroupMembers});

export default GroupMembers;
