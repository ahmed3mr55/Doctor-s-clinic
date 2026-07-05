import Joi from "joi";
import { cuid, optionalDate, optionalText } from "./common.validation";
import { procedureSchema } from "./procedure.validation";
import { visitImageSchema } from "./visit-image.validation";

const visitTypeValues = [
  "CONSULTATION",
  "FOLLOW_UP",
  "LASER",
  "BOTOX",
  "FILLER",
  "SURGERY",
  "SKINCARE",
];

const visitFields = {
  visitType: Joi.string()
    .valid(...visitTypeValues)
    .required()
    .messages({
      "any.only": "Visit type is invalid",
      "any.required": "Visit type is required",
      "string.empty": "Visit type is required",
    }),
  chiefComplaint: optionalText(2000),
  diagnosis: optionalText(2000),
  treatmentPlan: optionalText(3000),
  prescription: optionalText(3000),
  notes: optionalText(5000),
  height: Joi.number().min(0).max(300).allow("", null).empty("").default(null),
  weight: Joi.number().min(0).max(1000).allow("", null).empty("").default(null),
  bloodPressure: optionalText(40),
  nextVisitDate: optionalDate,
  procedures: Joi.array().items(procedureSchema).max(100).default([]),
  images: Joi.array().items(visitImageSchema).max(100).default([]),
};

const createVisitSchema = Joi.object({
  patientId: cuid.required().messages({
    "any.required": "Patient is required",
    "string.empty": "Patient is required",
  }),
  // 👈 إضافة معرف الموعد هنا كحقل اختياري ويقبل القيمة الفارغة أو النل
  appointmentId: cuid.optional().allow("", null), 
  ...visitFields,
});

const updateVisitSchema = Joi.object(visitFields);

export { createVisitSchema, updateVisitSchema, visitTypeValues };