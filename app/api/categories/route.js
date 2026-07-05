// app/api/categories/route.js

import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


export async function GET() {
  // GET lists categories, so it requires categories.read.
  const auth = await verifyAccess(["categories.read"]);
  if (!auth.authorized) {
    return accessDeniedResponse(auth);
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json({
    success: true,
    categories,
  });
}
