// app/api/articles/[id]/route.js
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { accessDeniedResponse, verifyAccess } from "@/lib/auth/verifyAccess";
import {
  isRequestValidationError,
  validateRequest,
  validationErrorResponse,
} from "@/lib/validateRequest";
import { updateArticleSchema } from "@/lib/validations/article.validation";

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

async function readJson(req) {
  return await req.json();
}

function getErrorResponse(error) {
  console.error(error);
  return json({ success: false, error: "Internal Server Error" }, 500);
}

// GET SINGLE ARTICLE
export async function GET(req, { params }) {
  try {
    // GET reads one article by id, so it requires articles.read.
    const auth = await verifyAccess(["articles.read"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return json({ success: false, error: "Article not found" }, 404);
    }

    return json({ success: true, article });
  } catch (error) {
    return getErrorResponse(error);
  }
}

// UPDATE ARTICLE (تعديل المقال)
export async function PUT(req, { params }) {
  try {
    // PUT updates an article, so it requires articles.update.
    const auth = await verifyAccess(["articles.update"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;
    const body = await readJson(req);

    // التحقق من صحة البيانات
    const validatedData = validateRequest(body, updateArticleSchema);

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return json({ success: false, error: "Article not found" }, 404);
    }

    // تصفية وحفظ الحقول بدقة (معالجة الـ categoryId)
    const {
      title,
      slug,
      categoryId, // 👈 استلام الـ ID الجديد للتصنيف من الفرونت إند
      content,
      image,
      author,
      readTime,
      tags,
      published,
    } = validatedData;

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        categoryId: categoryId || null, // 👈 التحديث في قاعدة البيانات
        content,
        image,
        author,
        readTime,
        tags,
        published,
      },
    });

    return json({
      success: true,
      article: updatedArticle,
    });
  } catch (error) {
    if (isRequestValidationError(error)) {
      return json(validationErrorResponse(error), 400);
    }
    return getErrorResponse(error);
  }
}

// DELETE ARTICLE
export async function DELETE(req, { params }) {
  try {
    // DELETE removes an article, so it requires articles.delete.
    const auth = await verifyAccess(["articles.delete"]);
    if (!auth.authorized) {
      return accessDeniedResponse(auth);
    }

    const { id } = await params;

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return json({ success: false, error: "Article not found" }, 404);
    }

    await prisma.article.delete({
      where: { id },
    });

    return json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
