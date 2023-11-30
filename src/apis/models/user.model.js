import DataTypes from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_fname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  user_lname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  user_email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  user_password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  user_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'users',
});

export default User;
