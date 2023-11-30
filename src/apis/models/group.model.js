import DataTypes from "sequelize";
import sequelize from "../db.js";

const Group = sequelize.define(
  "group",
  {
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_master: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "group" }
);

export default Group;
