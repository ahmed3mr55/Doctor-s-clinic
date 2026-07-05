import Joi from "joi";
import {
  optionalEmail,
  optionalText,
  requiredDate,
  requiredPhone,
  requiredText,
} from "./common.validation";

const bookingRequestStatusValues = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "CONVERTED_TO_APPOINTMENT",
];

const createBookingRequestSchema = Joi.object({
  fullName: requiredText("Full name", 3, 120),
  phone: requiredPhone,
  email: optionalEmail,
  preferredDate: requiredDate("Preferred date").optional(),
  appointmentDate: requiredDate("Appointment date").optional(),
  notes: optionalText(2000),
})
  .xor("preferredDate", "appointmentDate")
  .messages({
    "object.missing": "Preferred date is required",
    "object.xor": "Provide either preferredDate or appointmentDate, not both",
  });

const rejectBookingRequestSchema = Joi.object({
  status: Joi.string().valid("REJECTED").required().messages({
    "any.only": "Status must be REJECTED",
    "any.required": "Status is required",
  }),
});

export {
  bookingRequestStatusValues,
  createBookingRequestSchema,
  rejectBookingRequestSchema,
};
