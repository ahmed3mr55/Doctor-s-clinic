class RequestValidationError extends Error {
  constructor(details) {
    super("Validation failed");
    this.name = "RequestValidationError";
    this.details = details;
    this.status = 400;
  }
}

function formatPath(path) {
  return path
    .map((segment) => (typeof segment === "number" ? `[${segment}]` : segment))
    .join(".")
    .replace(/\.\[/g, "[");
}

function validateRequest(body, schema) {
  const { error, value } = schema.validate(body, {
    abortEarly: false,
    convert: true,
    stripUnknown: true,
  });

  if (error) {
    throw new RequestValidationError(
      error.details.map((detail) => ({
        field: formatPath(detail.path),
        message: detail.message,
      })),
    );
  }

  return value;
}

function isRequestValidationError(error) {
  return error instanceof RequestValidationError;
}

function validationErrorResponse(error) {
  return {
    success: false,
    error: "Validation failed",
    details: error.details,
  };
}

export {
  RequestValidationError,
  isRequestValidationError,
  validateRequest,
  validationErrorResponse,
};
