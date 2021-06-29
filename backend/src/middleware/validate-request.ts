import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import RequestValidatorError from '../errors/RequestValidator';

const validateRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    console.log("NOT EMPTY")
    throw new RequestValidatorError(errors.array());
  }
  next();
};

export default validateRequest;
