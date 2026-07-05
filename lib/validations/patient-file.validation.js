import Joi from "joi";
import { cuid, requiredText, url } from "./common.validation";

const patientFileSchema = Joi.object({
  patientId: cuid.required().messages({
    "any.required": "Patient is required",
    "string.empty": "Patient is required",
  }),
  fileUrl: url.required().messages({
    "any.required": "File URL is required",
    "string.empty": "File URL is required",
    "string.uri": "File URL must be a valid http or https URL",
  }),
  fileName: requiredText("File name", 1, 255),
});

export { patientFileSchema };
