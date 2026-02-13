export function validate(schema) {
  return function (req, res, next) {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
}
