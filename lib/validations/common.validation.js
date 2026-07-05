import Joi from "joi";

const PHONE_PATTERN = /^01[0125][0-9]{8}$/;

const optionalText = (max = 2000) =>
  Joi.string().trim().max(max).allow("", null).empty("").default(null);

const requiredText = (field, min = 1, max = 255) =>
  Joi.string().trim().min(min).max(max).required().messages({
    "any.required": `${field} is required`,
    "string.empty": `${field} is required`,
  });

const optionalDate = Joi.date().iso().allow("", null).empty("").default(null);
const requiredDate = (field) =>
  Joi.date().iso().required().messages({
    "any.required": `${field} is required`,
    "date.base": `${field} must be a valid date`,
    "date.format": `${field} must be a valid ISO date`,
  });

const optionalPhone = Joi.string()
  .trim()
  .pattern(PHONE_PATTERN)
  .allow("", null)
  .empty("")
  .default(null)
  .messages({
    "string.pattern.base": "Phone number must be a valid Egyptian mobile number",
  });

const requiredPhone = Joi.string().trim().pattern(PHONE_PATTERN).required().messages({
  "any.required": "Phone number is required",
  "string.empty": "Phone number is required",
  "string.pattern.base": "Phone number must be a valid Egyptian mobile number",
});

const optionalEmail = Joi.string()
  .trim()
  .lowercase()
  .email({ tlds: false })
  .allow("", null)
  .empty("")
  .default(null);

const cuid = Joi.string().trim().min(8).max(64);

const url = Joi.string().trim().uri({ scheme: ["http", "https"] });

export {
  cuid,
  optionalDate,
  optionalEmail,
  optionalPhone,
  optionalText,
  requiredDate,
  requiredPhone,
  requiredText,
  url,
};
