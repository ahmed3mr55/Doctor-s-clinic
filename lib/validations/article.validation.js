import Joi from "joi";
import { requiredText, url } from "./common.validation";

function generateSlug(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const slugSchema = Joi.string()
  .trim()
  .lowercase()
  .min(1)
  .max(200)
  .pattern(/^[\p{L}\p{N}-]+$/u)
  .messages({
    "string.pattern.base":
      "Slug may contain only letters, numbers, and hyphens",
  });

const articleBase = {
  title: requiredText("Title", 3, 200),
  categoryId: Joi.string().trim().required().messages({
    "any.required": "Category is required",
    "string.empty": "Category is required",
  }),
  content: requiredText("Content", 1, 100000),
  image: url.required().messages({
    "any.required": "Image is required",
    "string.empty": "Image is required",
    "string.uri": "Image must be a valid http or https URL",
  }),
  author: requiredText("Author", 1, 120),
  readTime: requiredText("Read time", 1, 40),
  tags: Joi.array()
    .items(Joi.string().trim().min(1).max(60))
    .max(30)
    .required(),
  published: Joi.boolean().default(true),
};

const createArticleSchema = Joi.object(articleBase).custom((value) => ({
  ...value,
  slug: generateSlug(value.title),
}));

const updateArticleSchema = Joi.object({
  ...articleBase,
  slug: slugSchema.required().messages({
    "any.required": "Slug is required",
    "string.empty": "Slug is required",
  }),
});

export { createArticleSchema, generateSlug, updateArticleSchema };
