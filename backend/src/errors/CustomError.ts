abstract class CustomError extends Error {
  statusCode: any;

  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: String; filed?: String }[];
}

export default CustomError;