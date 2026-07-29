import AppError from "./AppError.js";

export default class ValidationError extends AppError {
  constructor(message = "Validation Error", errors = null) {
    super(message, 400, errors);
  }
}
