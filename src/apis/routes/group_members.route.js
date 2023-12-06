import express from "express";
import Group from "../models/group.model.js";
import GroupMembers from "../models/todoList_members.model.js";
import User from "../models/user.model.js";

const routerGroupMembers = express.Router();

const getAllGroupMembers = async (req, res) => {
  try {
    const data = await GroupMembers.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getGroupMembersByGroupID = async (req, res) => {
  const groupId  = req.body.group_id;

  try {
    // Find the group by ID and include the associated users
    const group = await Group.findByPk(groupId, {
      include: {
        model: User,
        through: { attributes: [] }, // Exclude join table (createdAt, updatedAt) attributes 
      },
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const groupMembers = group.User; // Access the associated users through the "Users" property

    return res.json({ groupMembers });
  } 
  catch (error) {
    console.error('Error retrieving group members:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const addGroupMember = async (req, res) => {
  const groupId  = req.body.group_id;
  const memberId = req.body.user_id;

  try {

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    const member = await User.findByPk(memberId);
    group.addUser(member);

    return res.json({group});
  } 
  catch (error) {
    console.error('Error :', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

routerGroupMembers.get("/all", getAllGroupMembers);
routerGroupMembers.get("/membersByGroupId", getGroupMembersByGroupID);
routerGroupMembers.get("/addMember", addGroupMember);


export default routerGroupMembers;
