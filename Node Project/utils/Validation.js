const joi = require("joi");
const AppError = require("./AppError");
const registration = joi.object({
  email: joi.string().email().required(),
  userName: joi
    .string()
    .min(3)
    .max(15)
    .required()
    .pattern(new RegExp(/^[a-zA-Z\-]+$/)),
  password: joi
    .string()
    .required()
    .pattern(new RegExp(/^[0-9]+$/)),
});

const registrationValid = (req, res, next) => {
  const { error } = registration.validate(req.body);
  if (error) return next(new AppError(error.message, 404, error.details));
  next();
};

const login = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .required()
    .pattern(new RegExp(/^[0-9]+$/)),
});

const loginValid = (req, res, next) => {
  const { error } = login.validate(req.body);
  if (error) return next(new AppError(error.message, 404, error.details));
  next();
};

module.exports = {
  registrationValid,
  loginValid,
};
