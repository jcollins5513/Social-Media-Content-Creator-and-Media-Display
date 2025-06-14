import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to block write operations in read-only mode
 */
export const readOnlyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // List of HTTP methods that modify data
  const writeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  
  if (writeMethods.includes(req.method)) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'This is a read-only endpoint. Write operations are not allowed.'
    });
  }
  
  next();
};

/**
 * Wrapper to mark routes as read-only
 */
export const readOnlyRoute = (handler: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if this is a read operation
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return handler(req, res, next);
    }
    
    res.status(403).json({
      error: 'Forbidden',
      message: 'This is a read-only endpoint. Write operations are not allowed.'
    });
  };
};
