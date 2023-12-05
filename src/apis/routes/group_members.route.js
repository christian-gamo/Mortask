import express from "express";
import GroupMembers from "../models/group_members.model.js";

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

const createGroupMember = async (req, res) => {
  const group_name = req.body.group_name;
  const group_master = req.body.group_master;
  try {
  
    const group = await Group.create({
      group_name: groupName,
      group_master: groupMaster,
    });

    return res.json({ group });
  } catch (error) {
    console.error('Error creating group:', error);
    return res.status(500).json({ error: 'Internal server error' });
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

    User.find
    const groupMembers = group.User; // Access the associated users through the "Users" property

    return res.json({ groupMembers });
  } 
  catch (error) {
    console.error('Error retrieving group members:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

routerGroupMembers.get("/all", getAllGroupMembers);
routerGroupMembers.get("/membersByGroupId", getGroupMembersByGroupID);


export default routerGroupMembers;
