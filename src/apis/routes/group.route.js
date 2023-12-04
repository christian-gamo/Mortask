import express from "express";
import Group from "../models/group.model.js";

const routerGroup = express.Router();

const getAllGroups = async (req, res) => {
  try {
    const data = await Group.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGroupMasterByID = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const data = await GroupMembers.findAll({
      where:{
        group_id: groupId
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

routerGroup.get("/group/all", getAllGroups);

export default routerGroup;
