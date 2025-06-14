import { Router } from 'express';
import { body, param } from 'express-validator';
import { 
    getVehicles, 
    getVehicleById, 
    generateVehicleContentAndTrack
} from '../controllers/vehicle.controller';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Route to get a list of all vehicles
router.get('/', getVehicles);

// Route to get a single vehicle by its ID
router.get('/:id', [
  param('id').isString().notEmpty().withMessage('Invalid vehicle ID'),
  validateRequest
], getVehicleById);

// Route to generate all content for a vehicle and update tracking fields
router.post('/:id/generate-all-content', generateVehicleContentAndTrack);

export default router;
