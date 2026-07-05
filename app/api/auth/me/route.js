// /api/auth/me
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";


// GET /api/auth/me
export async function GET() {
  try {
    const auth = await verifyToken();

    if (!auth.verified) {
      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        {
          status: 401,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: auth.user.id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        specialization: true,
        active: true,

        role: {
          select: {
            id: true,
            name: true,

            permissions: {
              select: {
                permission: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    if (!user.active) {
      return NextResponse.json(
        {
          success: false,
          message: "Account disabled",
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.json({
      success: true,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        specialization: user.specialization,

        role: {
          id: user.role.id,
          name: user.role.name,
        },

        permissions: user.role.permissions.map(
          (item) => item.permission.name,
        ),
      },
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