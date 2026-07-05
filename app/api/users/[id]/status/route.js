import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";

export async function PATCH(req, { params }) {
  try {
    // Toggling account status changes a user account, so it requires users.update.
    const auth = await verifyAccess(["users.update"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;
    const { active } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { active },
      select: { id: true, active: true, name: true }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: "فشل تحديث حالة الحساب" }, { status: 500 });
  }
}
