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

routerGroup.get("/", getAllGroups);

export default routerGroup;
