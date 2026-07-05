import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";

export async function GET(req, { params }) {
  try {
    // GET reads one role and its permissions, so it requires roles.read per the roles endpoint rule.
    const auth = await verifyAccess(["roles.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    const roleWithPermissions = await prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    });

    if (!roleWithPermissions) {
      return NextResponse.json({ success: false, error: "الدور المطلوب غير معرف بالنظام" }, { status: 404 });
    }

    // صياغة الرد حسب الهيكل المطلوب بدقة
    const formattedResponse = {
      id: roleWithPermissions.id,
      name: roleWithPermissions.name,
      permissions: roleWithPermissions.permissions.map(rp => ({
        id: rp.permission.id,
        name: rp.permission.name,
        description: rp.permission.description
      }))
    };

    return NextResponse.json({ success: true, role: formattedResponse });
  } catch (error) {
    return NextResponse.json({ success: false, error: "حدث خطأ أثناء جلب صلاحيات الدور" }, { status: 500 });
  }
}
