import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

/**
 * Middleware to handle database-related errors
 * Provides specific error messages for read-only mode violations
 */
export const databaseErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle specific Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Permission denied errors from the database
    if (err.code === 'P2004' || err.code === 'P2028') {
      return res.status(403).json({
        error: 'Database Permission Denied',
        message: 'This operation requires write permissions, but the database connection is read-only.',
        details: 'The application is currently in read-only mode.'
      });
    }

    // Database connection errors
    if (err.code === 'P2024' || err.code === 'P2021') {
      return res.status(500).json({
        error: 'Database Connection Error',
        message: 'Could not connect to the database. Please try again later.',
      });
    }

    // Generic database error
    return res.status(500).json({
      error: 'Database Error',
      message: 'An error occurred while accessing the database.',
      code: err.code
    });
  }

  // Handle custom read-only errors thrown by our middleware
  if (err.message?.includes('not allowed in read-only mode')) {
    return res.status(403).json({
      error: 'Read-Only Mode',
      message: 'This operation is not allowed in read-only mode.',
      details: err.message
    });
  }

  // Pass to the next error handler if not handled here
  next(err);
};
