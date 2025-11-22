import express from 'express';
import { pingCheck } from '../../controller/pingController.js';

const router = express.Router();

router.use('/ping', pingCheck)

export default router;