import AppError from "./AppError.js";

export default class BadRequestError extends AppError {
  constructor(message = "Bad Request", errors = null) {
    super(message, 400, errors);
  }
}
