// app/api/articles/[slug]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

function getErrorResponse(error) {
  console.log(error);

  return json(
    {
      success: false,
      error: "Internal Server Error",
    },
    500,
  );
}

// GET SINGLE ARTICLE
export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
      }
    });

    if (!article) {
      return json(
        {
          success: false,
          error: "Article not found",
        },
        404,
      );
    }

    return json({
      success: true,
      article,
    });
  } catch (error) {
    return getErrorResponse(error);
  }
}
