import Joi from "joi";
import { optionalText, requiredText } from "./common.validation";

const procedureSchema = Joi.object({
  name: requiredText("Procedure name", 1, 160),
  price: Joi.number().min(0).max(1000000).allow("", null).empty("").default(0),
  description: optionalText(1000),
});

export { procedureSchema };
