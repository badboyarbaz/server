import express from "express";
const router = express.Router();
import {
  createBus,
  updateBus,
  deleteBus,
  getBus,
  getBuses
} from "../controllers/bus.js";
import passport from "../utils/passport.js";
//import { verifyAdmin } from "../utils/verifyToken.js";


router.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  next();
});
// CREATE
router.post('/', passport.authenticate('jwt', { session: false }),  async (req, res, next) => {
  try {
    const result = await createBus(req, res, next);
    res.status(201).json(result);
  } catch (error) {
    next (error);
  }
});

// UPDATE
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const result = await updateBus(req, res, next);
    res.status(200).json(result);
  } catch (error) {
    next (error);
  }
});

// DELETE
router.delete('/:id', passport.authenticate('jwt', { session: false }),  async (req, res, next) => {
  try {
    const result = await deleteBus(req, res, next);
    res.status(200).json(result);
  } catch (error) {
    next (error);
  }
});

// GET
router.get('/:id', async (req, res, next) => {
  try {
    const result = await getBus(req, res, next);
    res.status(200).json(result);
  } catch (error) {
    next (error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const result = await getBuses(req, res, next);
    res.status(200).json(result);
  } catch (error) {
    next (error);
  }
});

export default router;

