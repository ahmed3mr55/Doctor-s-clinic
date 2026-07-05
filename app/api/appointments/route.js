import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import {
  BookingApiError,
  createBookingRequestFromPayload,
} from "@/lib/booking-service";
import {
  isRequestValidationError,
  validateRequest,
  validationErrorResponse,
} from "@/lib/validateRequest";
import { createBookingRequestSchema } from "@/lib/validations/booking-request.validation";

function jsonError(error, status) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request) {
  try {
    // POST creates a new appointment request, so it requires appointments.create.
    const auth = await verifyAccess(["appointments.create"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const body = await request.json();
    const validatedData = validateRequest(body, createBookingRequestSchema);

    const result = await prisma.$transaction(async (tx) => {
      // Public booking creates only a BookingRequest.
      // Appointment is a final schedule entity and is created only by admin approval.
      return createBookingRequestFromPayload(tx, validatedData);
    });

    return NextResponse.json(
      {
        success: true,
        bookingRequest: result.bookingRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    if (isRequestValidationError(error)) {
      return NextResponse.json(validationErrorResponse(error), { status: 400 });
    }

    if (error instanceof BookingApiError) {
      return jsonError(error.code, error.status);
    }

    console.error("Error creating booking request from appointments API:", error);
    return jsonError("INTERNAL_SERVER_ERROR", 500);
  }
}
