import express from "express";
import GroupMember from "../models/group_member.model.js";

const routerGroupMember = express.Router();

const getAllGroupMembers = async (req, res) => {
  try {
    const data = await GroupMember.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

routerGroupMember.get("/", getAllGroupMembers);

export default routerGroupMember;
