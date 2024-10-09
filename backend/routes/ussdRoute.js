import express from "express";
import { handleUSSDRequest } from "../controllers/menuController.js";

const router = express.Router();

router.post("/", handleUSSDRequest);

export default router;
