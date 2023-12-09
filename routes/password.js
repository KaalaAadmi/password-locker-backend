import express from "express";
import {
	addPassword,
	getAllPasswordsByUserId,
	getRecentPasswordsByUserId
} from "./../controllers/password.js";

const router = express.Router();

// Add Credential
router.post("/add-password", addPassword);

// Get all passwords for a user
router.post("/get-all-passwords", getAllPasswordsByUserId);

// Get recent passwords for a user
router.post("/get-recent-passwords", getRecentPasswordsByUserId);

export default router;
