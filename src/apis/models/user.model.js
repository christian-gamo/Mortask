import DataTypes from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_status: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
});

export default User;
