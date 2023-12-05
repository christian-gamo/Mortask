import express from "express";
import Group from "../models/group.model.js";
import GroupMembers from "../models/group_members.model.js";

const routerGroup = express.Router();

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    return res.status(200).json(groups);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createGroup = async (req, res) => {
  const group_name = req.body.group_name;
  const group_master = req.body.group_master;
  try {
    const group = await Group.create({ group_name, group_master });
    
    return res.status(201).json(group);
  } 
  catch (error) {
    console.error('Error while creating group:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getGroupById = async (groupId) => {
  try {
    const group = await Group.findByPk(groupId);
    return res.status(200).json(group);
  } catch (error) {
    console.error(`Error while fetching group with ID ${groupId}:`, error);
    throw new Error('Failed to retrieve group');
  }
};

routerGroup.get("/group/all", getAllGroups);
routerGroup.get("/group/create", getAllGroups);

export default routerGroup;
