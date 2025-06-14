import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { prisma } from './lib/prismaClient';
import { errorHandler } from './middleware/errorHandler';
import { databaseErrorHandler } from './middleware/databaseErrorHandler';
import { readOnlyMiddleware } from './middleware/readOnlyMiddleware';
import vehicleRoutes from './routes/vehicle.routes';
import contentRoutes from './routes/content.routes';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Prisma Client is initialized in ./lib/prismaClient.ts
export { prisma };

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Apply read-only middleware to all routes by default
app.use(readOnlyMiddleware);

// API Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/content', contentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(databaseErrorHandler);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

export default app;
