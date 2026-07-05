import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";

export async function GET() {
  try {
    // GET lists roles, so it requires roles.read per the roles endpoint rule.
    const auth = await verifyAccess(["roles.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const roles = await prisma.role.findMany({
      orderBy: { name: "asc" }
    });
    return NextResponse.json({ success: true, roles });
  } catch (error) {
    return NextResponse.json({ success: false, error: "فشل جلب قائمة الأدوار الطبية" }, { status: 500 });
  }
}
