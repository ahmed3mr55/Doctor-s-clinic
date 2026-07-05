import { randomUUID } from "crypto";

const DEFAULT_PATIENT_GENDER = "MALE";

class BookingApiError extends Error {
  constructor(code, status = 400) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

function requiredString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function normalizeBookingPayload(body) {
  const preferredDate = body.preferredDate ?? body.appointmentDate;

  if (!requiredString(body.fullName)) {
    throw new BookingApiError("FULL_NAME_REQUIRED", 400);
  }

  if (!requiredString(body.phone)) {
    throw new BookingApiError("PHONE_REQUIRED", 400);
  }

  if (!preferredDate) {
    throw new BookingApiError("PREFERRED_DATE_REQUIRED", 400);
  }

  const parsedPreferredDate = new Date(preferredDate);

  if (Number.isNaN(parsedPreferredDate.getTime())) {
    throw new BookingApiError("INVALID_PREFERRED_DATE", 400);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedPreferredDate < today) {
    throw new BookingApiError("PREFERRED_DATE_IN_PAST", 400);
  }

  return {
    fullName: body.fullName.trim(),
    phone: body.phone.trim(),
    email: requiredString(body.email) ? body.email.trim() : null,
    preferredDate: parsedPreferredDate,
    notes: requiredString(body.notes) ? body.notes.trim() : null,
  };
}

async function createUniquePatientCode(tx) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const patientCode = `TAN-${randomUUID().slice(0, 8).toUpperCase()}`;
    const existingPatient = await tx.patient.findUnique({
      where: { patientCode },
      select: { id: true },
    });

    if (!existingPatient) {
      return patientCode;
    }
  }

  throw new BookingApiError("PATIENT_CODE_GENERATION_FAILED", 500);
}

async function getOrCreatePatient(tx, bookingData) {
  const existingPatient = await tx.patient.findUnique({
    where: { phone: bookingData.phone },
  });

  if (existingPatient) {
    return existingPatient;
  }

  const patientCode = await createUniquePatientCode(tx);

  try {
    return await tx.patient.create({
      data: {
        patientCode,
        fullName: bookingData.fullName,
        phone: bookingData.phone,
        email: bookingData.email,
        gender: DEFAULT_PATIENT_GENDER,
      },
    });
  } catch (error) {
    if (error?.code === "P2002") {
      const racedPatient = await tx.patient.findUnique({
        where: { phone: bookingData.phone },
      });

      if (racedPatient) {
        return racedPatient;
      }
    }

    throw error;
  }
}

async function createBookingRequestFromPayload(tx, body) {
  const bookingData = normalizeBookingPayload(body);
  const patient = await getOrCreatePatient(tx, bookingData);

  // Public booking stops here: BookingRequest is the source of truth.
  // Appointment records are created only from the admin approval endpoint.
  const bookingRequest = await tx.bookingRequest.create({
    data: {
      fullName: bookingData.fullName,
      phone: bookingData.phone,
      email: bookingData.email,
      preferredDate: bookingData.preferredDate,
      notes: bookingData.notes,
      status: "PENDING",
    },
  });

  return { bookingRequest, patient };
}

function buildAppointmentNotes(bookingRequest) {
  const notes = [`Converted from booking request ${bookingRequest.id}.`];

  if (bookingRequest.notes?.trim()) {
    notes.push(`Booking notes: ${bookingRequest.notes.trim()}`);
  }

  return notes.join(" ");
}

export {
  BookingApiError,
  buildAppointmentNotes,
  createBookingRequestFromPayload,
  getOrCreatePatient,
};
