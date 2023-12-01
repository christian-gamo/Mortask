import DataTypes from "sequelize";
import sequelize from "../db.js";

const GroupMembers = sequelize.define('GroupMembers', {
  group_members_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
{
  tableName: 'group_members',
});


export default GroupMembers;
