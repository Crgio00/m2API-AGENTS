import express from "express";
import { 
    getAgents,
    getAgent,
    createAgent,
    deleteAgent,
    updateAgent,
 } from "../controllers/agents.controller";
import { verifyJWT } from "../controllers/auth.controller";

 const router = express.Router();

 router.get("/", verifyJWT, getAgents)
 router.get("/:id", verifyJWT, getAgent)
 router.post("/", verifyJWT, createAgent)
 router.put("/:id", verifyJWT, updateAgent)
 router.get("/:id", verifyJWT, deleteAgent)

 export default router;