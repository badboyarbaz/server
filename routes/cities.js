import express from 'express';
import * as cityController from '../controllers/city.js';

const router = express.Router();

router.get('/', cityController.getAllCities);

export default router;
