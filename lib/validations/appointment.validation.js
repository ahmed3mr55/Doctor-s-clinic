import Joi from "joi";
import { cuid, optionalText, requiredDate } from "./common.validation";

const appointmentStatusValues = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
  "NO_SHOW",
];

const createAppointmentSchema = Joi.object({
  patientId: cuid.required().messages({
    "any.required": "Patient is required",
    "string.empty": "Patient is required",
  }),
  appointmentDate: requiredDate("Appointment date"),
  status: Joi.string()
    .valid(...appointmentStatusValues)
    .default("PENDING")
    .messages({
      "any.only": "Appointment status is invalid",
    }),
  notes: optionalText(2000),
});

export { appointmentStatusValues, createAppointmentSchema };
