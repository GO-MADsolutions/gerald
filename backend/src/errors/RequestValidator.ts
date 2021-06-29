import { ValidationError } from 'express-validator';
import CustomError from './CustomError';

class RequestValidatorError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidatorError.prototype);
  }

  serializeErrors() {
    console.log("GETTING IN serializeErrors");
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}

export default RequestValidatorError;
