import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import {
  BookingApiError,
  buildAppointmentNotes,
  getOrCreatePatient,
} from "@/lib/booking-service";

class ApprovalError extends Error {
  constructor(code, status) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

function jsonError(error, status) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request, { params }) {
  try {
    // Approval converts a booking request into an appointment, so it requires bookingRequests.approve.
    const auth = await verifyAccess(["bookingRequests.approve"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    if (!id) {
      return jsonError("BOOKING_REQUEST_ID_REQUIRED", 400);
    }

    const result = await prisma.$transaction(async (tx) => {
      const bookingRequest = await tx.bookingRequest.findUnique({
        where: { id },
      });

      if (!bookingRequest) {
        throw new ApprovalError("NOT_FOUND", 404);
      }

      if (bookingRequest.status !== "PENDING") {
        throw new ApprovalError("ALREADY_PROCESSED", 409);
      }

      const patient = await getOrCreatePatient(tx, {
        fullName: bookingRequest.fullName,
        phone: bookingRequest.phone,
        email: bookingRequest.email,
      });

      const statusUpdate = await tx.bookingRequest.updateMany({
        where: {
          id: bookingRequest.id,
          status: "PENDING",
        },
        data: {
          status: "CONVERTED_TO_APPOINTMENT",
        },
      });

      if (statusUpdate.count !== 1) {
        throw new ApprovalError("ALREADY_PROCESSED", 409);
      }

      const appointment = await tx.appointment.create({
        data: {
          patientId: patient.id,
          appointmentDate: bookingRequest.preferredDate,
          status: "PENDING",
          notes: buildAppointmentNotes(bookingRequest),
        },
      });

      const updatedBookingRequest = await tx.bookingRequest.findUnique({
        where: { id: bookingRequest.id },
      });

      // Approval is the only conversion boundary:
      // BookingRequest remains the source record, Appointment is created atomically.
      return {
        bookingRequest: updatedBookingRequest,
        appointment,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ApprovalError || error instanceof BookingApiError) {
      return jsonError(error.code, error.status);
    }

    console.error("Error approving booking request:", error);
    return jsonError("INTERNAL_SERVER_ERROR", 500);
  }
}
