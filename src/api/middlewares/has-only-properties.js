module.exports = function hasOnlyProperties(...allowedProperties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      for (const property in data) {
        if (!allowedProperties.includes(property)) {
          const error = new Error(
            `Unexpected property '${property}' in the request body.`
          );
          error.status = 400;
          throw error;
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
