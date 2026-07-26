export const validate = (schema) => {
  return (req, res, next) => {
    const payload = req.body;

    if (schema && typeof schema.safeParse === "function") {
      let result = schema.safeParse(payload);
      let parsedBody = payload;

      if (!result.success) {
        const nestedResult = schema.safeParse({ body: payload });

        if (nestedResult.success) {
          parsedBody = nestedResult.data.body;
          result = nestedResult;
        } else {
          return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: result.error.issues.map((item) => ({
              field: item.path.join("."),
              message: item.message,
            })),
          });
        }
      }

      req.body = parsedBody;
      return next();
    }

    const { error, value } = schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((item) => ({
          field: item.path.join("."),
          message: item.message,
        })),
      });
    }

    req.body = value;
    next();
  };
};
