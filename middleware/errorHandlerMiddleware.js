import {StatusCodes} from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const StatusCode = err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || "Something went wrong, try again later";
  res.status(StatusCode).json({ message });
};

export default errorHandlerMiddleware;