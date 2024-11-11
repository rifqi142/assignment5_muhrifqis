// All Response Header Helper
// Description: This file is used to send response headers to the client

const successResponseCreatedData = (res, message, code = 201, data) => {
  return res.status(code).json({
    status: "success",
    message,
    code,
    data,
  });
};

const successResponse = (res, message, code = 200, data) => {
  return res.status(code).json({
    status: "success",
    message,
    code,
    data,
  });
};

const successDeleteResponse = (res, message, code = 204) => {
  return res.status(code).json({
    status: "success",
    message,
    code,
  });
};

const errorServerResponse = (res, message, code = 500) => {
  return res.status(code).json({
    status: "error",
    message,
    code,
  });
};

const errorClientResponse = (res, message, code = 400) => {
  return res.status(code).json({
    status: "error",
    message,
    code,
  });
};

const errorNotFoundResponse = (res, message, code = 404) => {
  return res.status(code).json({
    status: "error",
    message,
    code,
  });
};

const errorConflictResponse = (res, message, code = 409) => {
  return res.status(code).json({
    status: "error",
    message: message,
    code: code,
  });
};

module.exports = {
  successResponseCreatedData,
  successResponse,
  successDeleteResponse,
  errorServerResponse,
  errorClientResponse,
  errorNotFoundResponse,
  errorConflictResponse,
};
