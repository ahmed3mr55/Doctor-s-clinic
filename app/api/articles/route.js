// app/api/articles/route.js

import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import {
  isRequestValidationError,
  validateRequest,
  validationErrorResponse,
} from "@/lib/validateRequest";
import { createArticleSchema } from "@/lib/validations/article.validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PAGE_SIZE = 50;

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : value;
}

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.min(parsed, MAX_PAGE_SIZE);
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function getErrorResponse(error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return json(
        {
          success: false,
          error: "An article with this unique field already exists.",
        },
        409,
      );
    }
  }

  console.error(error);

  return json(
    {
      success: false,
      error: "An unexpected server error occurred.",
    },
    500,
  );
}

// GET /api/articles
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    
    // 👈 إعدادات الـ Pagination المستقبلة من الفرونت إند
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6; // حددنا هنا عرض 6 مقالات بالصفحة الواحدة كمثال
    const skip = (page - 1) * limit;

    // بناء فلتر البحث
    let whereClause = {};
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    // 👈 جلب البيانات متوازية: عدد المقالات الإجمالي والمقالات المحددة للصفحة
    const [articles, totalCount] = await Promise.all([
      prisma.article.findMany({
        where: whereClause,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        orderBy: { createdAt: "desc" },
        skip, // تفويت المقالات السابقة
        take: limit, // جلب العدد المطلوب فقط
      }),
      prisma.article.count({ where: whereClause }) // إجمالي المقالات الكلي للفلتر الحالي
    ]);

    return NextResponse.json({
      success: true,
      articles,
      // 👈 إرسال بيانات المقارنة والحسابات للفرونت إند ليعتمد عليها في الأزرار
      pagination: {
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit
      }
    });
  } catch (err) {
    console.error("Error fetching articles for dashboard:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء جلب البيانات من قاعدة البيانات" }, 
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // POST creates an article, so it requires articles.create.
    const auth = await verifyAccess(["articles.create"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const body = await readJson(req);
    const validatedData = validateRequest(body, createArticleSchema);

    const article = await prisma.article.create({
      data: validatedData,
    });

    return json(
      {
        success: true,
        article,
      },
      201,
    );
  } catch (err) {
    if (isRequestValidationError(err)) {
      return json(validationErrorResponse(err), 400);
    }

    return getErrorResponse(err);
  }
}
