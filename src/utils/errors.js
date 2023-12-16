function asyncErrorBoundary(delegate, defaultStatus) {
  return (request, response, next) => {
    Promise.resolve()
      .then(() => delegate(request, response, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message,
        });
      });
  };
}

function methodNotAllowed(request, response, next) {
    next({
      status: 405,
      message: `${request.method} not allowed for ${request.originalUrl}`,
    });
  }

/**
 * Express API error handler.
 */
function errorHandler(error, request, response, next) {
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
}

/**
 * Express API "Not found" handler.
 */
function notFound(request, response, next) {
  next({ status: 404, message: `Path not found: ${request.originalUrl}` });
}

module.exports = {
  asyncErrorBoundary,
  notFound,
  errorHandler,
  methodNotAllowed
}
