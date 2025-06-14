import { Router } from 'express';
import { body, param } from 'express-validator';
import { getVehicles, getVehicleById } from '../controllers/vehicle.controller';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Get all vehicles
router.get('/', getVehicles);

// Get vehicle by ID
router.get('/:id', [
  param('id').isString().notEmpty().withMessage('Invalid vehicle ID'),
  validateRequest
], getVehicleById);

export default router;
