import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Password from "./../models/Password.js";
dotenv.config();

export const addPassword = async (req, res) => {
	try {
		const pwd = await Password.findOne({
			friendlyName: req.body.friendlyName,
		});
		if (pwd) {
			return res.status(400).send({
				message: "Credentials with that friendly name already exists",
			});
		}
		const password = new Password({
			friendlyName: req.body.friendlyName,
			username: req.body.username,
			password: CryptoJS.AES.encrypt(
				req.body.password,
				process.env.PASS_SEC
			).toString(),
			userId: req.body.userId,
			credentialType: req.body.credentialType,
		});
		const savedPassword = await password.save();
		return res.status(201).json({
			success: true,
			savedPassword,
		});
	} catch (error) {
		console.error(JSON.stringify(error));
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const getAllPasswordsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find all passwords for the given userId
    const passwords = await Password.find({ userId });

    if (!passwords || passwords.length === 0) {
      return res.status(404).json({ message: 'No passwords found for the given userId' });
    }

    // Decrypt passwords
    const decryptedPasswords = passwords.map((password) => ({
      _id: password._id,
      friendlyName: password.friendlyName,
      username: password.username,
      password: CryptoJS.AES.decrypt(password.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8),
      userId: password.userId,
			credentialType: password.credentialType,
      createdAt: password.createdAt,
      updatedAt: password.updatedAt,
    }));

    res.json({ passwords: decryptedPasswords });
  } catch (error) {
    console.error(JSON.stringify(error));
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getRecentPasswordsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the most recent 6 passwords for the given userId
    const passwords = await Password.find({ userId })
      .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
      .limit(6); // Limit to 6 results

    if (!passwords || passwords.length === 0) {
      return res.status(404).json({ message: 'No recent passwords found for the given userId' });
    }

    // Decrypt passwords
    const decryptedPasswords = passwords.map((password) => ({
      _id: password._id,
      friendlyName: password.friendlyName,
      username: password.username,
      password: CryptoJS.AES.decrypt(password.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8),
      userId: password.userId,
      createdAt: password.createdAt,
      updatedAt: password.updatedAt,
    }));

    res.json({ recentPasswords: decryptedPasswords });
  } catch (error) {
    console.error(JSON.stringify(error));
    res.status(500).json({ success: false, error: error.message });
  }
};