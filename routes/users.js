import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";

import verifyToken, { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("You are authenticated");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("You are authenticated and you can delete your account");
// });

// UPDATE
router.put("/:id", verifyUser, async (req, res, next) => {
  try {
    const result = await updateUser(req, res, next);
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
});

// DELETE
router.delete("/:id", verifyUser, async (req, res, next) => {
  try {
    const result = await deleteUser(req, res, next);
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
});

// GET
router.get("/:id", verifyUser, async (req, res, next) => {
  try {
    const result = await getUser(req, res, next);
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
});

router.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const result = await getUsers(req, res, next);
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
});

export default router;
