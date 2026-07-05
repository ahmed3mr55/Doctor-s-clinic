// app/api/auth/login/route.js

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        {
          status: 400,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },

      include: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
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

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
      },

      JWT_SECRET,

      {
        expiresIn: "30d",
      },
    );

    const response = NextResponse.json({
      success: true,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    });

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30* 24 * 60 * 60, // 30 days in seconds
      path: "/",
    });

    return response;
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
