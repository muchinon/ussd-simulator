import { getLocalizedMessage } from "../controllers/languageController.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const language = req.body.language || "english";

  let message;
  if (statusCode === 404) {
    message = getLocalizedMessage("NOT_FOUND", language);
  } else if (statusCode === 400) {
    message = getLocalizedMessage("BAD_REQUEST", language);
  } else {
    message = getLocalizedMessage("SERVER_ERROR", language);
  }

  res.status(statusCode).send(`END ${message}`);
};

export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
