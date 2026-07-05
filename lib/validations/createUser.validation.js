import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "الاسم الكامل مطلوب ولا يمكن تركه فارغاً",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "البريد الإلكتروني مطلوب",
    "string.email": "صيغة البريد الإلكتروني المدخلة غير صالحة",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "كلمة المرور مطلوبة",
    "string.min": "يجب ألا تقل كلمة المرور عن 8 أحرف وأرقام حمائية",
  }),
  phone: Joi.string().allow("", null),
  roleId: Joi.string().required().messages({
    "string.empty": "يجب تعيين دور وظيفي طبي للمستخدم",
  }),
  specialization: Joi.string().allow("", null),
  avatar: Joi.string().allow("", null),
  active: Joi.boolean().default(true)
});