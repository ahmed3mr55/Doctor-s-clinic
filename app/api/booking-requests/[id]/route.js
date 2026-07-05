import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import {
  isRequestValidationError,
  validateRequest,
  validationErrorResponse,
} from "@/lib/validateRequest";
import { rejectBookingRequestSchema } from "@/lib/validations/booking-request.validation";

function jsonError(error, status) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function PATCH(request, { params }) {
  try {
    // PATCH changes booking request status, so it requires bookingRequests.update.
    const auth = await verifyAccess(["bookingRequests.update"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;
    const { status } = validateRequest(
      await request.json(),
      rejectBookingRequestSchema,
    );

    if (!id) {
      return jsonError("BOOKING_REQUEST_ID_REQUIRED", 400);
    }

    if (status !== "REJECTED") {
      return jsonError("INVALID_STATUS_TRANSITION", 400);
    }

    const result = await prisma.bookingRequest.updateMany({
      where: {
        id,
        status: "PENDING",
      },
      data: {
        status: "REJECTED",
      },
    });

    if (result.count !== 1) {
      const bookingRequest = await prisma.bookingRequest.findUnique({
        where: { id },
        select: { status: true },
      });

      if (!bookingRequest) {
        return jsonError("NOT_FOUND", 404);
      }

      return jsonError("INVALID_STATUS_TRANSITION", 409);
    }

    const bookingRequest = await prisma.bookingRequest.findUnique({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      bookingRequest,
    });
  } catch (error) {
    if (isRequestValidationError(error)) {
      return NextResponse.json(validationErrorResponse(error), { status: 400 });
    }

    console.error("Error rejecting booking request:", error);
    return jsonError("INTERNAL_SERVER_ERROR", 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    // DELETE removes a booking request, so it requires bookingRequests.delete.
    const auth = await verifyAccess(["bookingRequests.delete"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    if (!id) {
      return jsonError("BOOKING_REQUEST_ID_REQUIRED", 400);
    }

    await prisma.bookingRequest.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error?.code === "P2025") {
      return jsonError("NOT_FOUND", 404);
    }

    console.error("Error deleting booking request:", error);
    return jsonError("INTERNAL_SERVER_ERROR", 500);
  }
}
