import Joi from "joi";
import { url } from "./common.validation";

const imageTypeValues = ["BEFORE", "AFTER", "REPORT"];

const visitImageSchema = Joi.object({
  imageUrl: url.required().messages({
    "any.required": "Image URL is required",
    "string.empty": "Image URL is required",
    "string.uri": "Image URL must be a valid http or https URL",
  }),
  type: Joi.string()
    .valid(...imageTypeValues)
    .required()
    .messages({
      "any.only": "Image type must be BEFORE, AFTER, or REPORT",
      "any.required": "Image type is required",
    }),
});

export { imageTypeValues, visitImageSchema };
