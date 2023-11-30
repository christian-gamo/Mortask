import express from "express";
import GroupMembers from "../models/group_member.model.js";

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

routerGroupMembers.get("/group_members/all", getAllGroupMembers);
routerGroupMembers.get("/group_members/byGroupId", getGroupMembersByGroupID);

export default routerGroupMembers;
