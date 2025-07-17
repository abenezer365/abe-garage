import express from 'express';
import { addRequest, updateStatus } from '../controller/request.controller.js';

const router = express.Router();

// Only Admin or Manager can attach services to an order
router.post('/add_request', addRequest);
router.patch("/update_status/:request_id", updateStatus )

export default router;
