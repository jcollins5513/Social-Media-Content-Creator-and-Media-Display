import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, ValidationError } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array().map(err => {
        const e = err as ValidationError
        return {
          param: (e as any).param ?? (e as any).path,
          message: e.msg,
        }
      }),
    });
  }
  next();
};

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      status: 'fail',
      errors: errors.array().map(err => {
        const e = err as ValidationError
        return {
          param: (e as any).param ?? (e as any).path,
          message: e.msg,
        }
      }),
    });
  };
};
