import Joi from "joi";
import {
  optionalDate,
  optionalEmail,
  optionalPhone,
  optionalText,
  requiredPhone,
  requiredText,
} from "./common.validation";

const genderValues = ["MALE", "FEMALE"];
const bloodTypeValues = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const patientFields = {
  fullName: requiredText("Full name", 3, 120),
  phone: requiredPhone,
  email: optionalEmail,
  gender: Joi.string().valid(...genderValues).required().messages({
    "any.only": "Gender must be MALE or FEMALE",
    "any.required": "Gender is required",
  }),
  birthDate: optionalDate,
  bloodType: Joi.string()
    .trim()
    .valid(...bloodTypeValues)
    .allow("", null)
    .empty("")
    .default(null),
  address: optionalText(300),
  city: optionalText(120),
  emergencyContact: optionalText(120),
  emergencyPhone: optionalPhone,
  allergies: optionalText(2000),
  chronicDiseases: optionalText(2000),
  medications: optionalText(2000),
  notes: optionalText(5000),
};

const createPatientSchema = Joi.object(patientFields);
const updatePatientSchema = Joi.object(patientFields);

export { createPatientSchema, updatePatientSchema };
