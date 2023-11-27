import DataTypes from "sequelize";
import sequelize from "../db.js";

const GroupMember = sequelize.define(
  "GroupMember",
  {
    group_member_id: {
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

export default GroupMember;
