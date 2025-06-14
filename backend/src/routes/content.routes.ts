import { Router } from 'express';
import { body, param } from 'express-validator';
import { generateVehicleContent, generateEmailContent } from '../controllers/content.controller';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Generate content for a specific vehicle
router.get('/vehicles/:id', [
  param('id').isString().notEmpty().withMessage('Invalid vehicle ID'),
  validateRequest
], generateVehicleContent);

// Generate email content for a specific vehicle
router.post('/vehicles/:id/email', [
  param('id').isString().notEmpty().withMessage('Invalid vehicle ID'),
  body('emailType')
    .optional()
    .isString()
    .isIn(['general', 'manager-special', 'holiday-sale', 'inventory-update'])
    .withMessage('Invalid email type'),
  body('customMessage')
    .optional()
    .isString()
    .withMessage('Custom message must be a string'),
  validateRequest
], generateEmailContent);

export default router;
