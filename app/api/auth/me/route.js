// /api/auth/me
import { NextResponse } from "next/server";
import { authService } from "@/lib/services/auth.service";

// GET /api/auth/me
export async function GET() {
  try {
    const result = await authService.getCurrentUser();

    if (!result.success) {
      const status = result.message === "User not found" ? 404 : 401;
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        {
          status,
        },
      );
    }

    return NextResponse.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}