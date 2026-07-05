import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import bcrypt from "bcrypt"; // تأكد من تنصيبه أو استبداله بطريقة التشفير المعتمدة لديك

export async function POST(req, { params }) {
  try {
    // Resetting a password changes a user account, so it requires users.update.
    const auth = await verifyAccess(["users.update"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;
    const { newPassword } = await req.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ success: false, error: "كلمة المرور يجب ألا تقل عن 6 أحرف" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ success: true, message: "تم إعادة تعيين كلمة المرور بنجاح" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "فشل تغيير كلمة المرور" }, { status: 500 });
  }
}