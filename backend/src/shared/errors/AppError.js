export default class AppError extends Error {
  constructor(message, status = 500, errors = null) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}
