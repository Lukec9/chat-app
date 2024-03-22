import Joi from "joi";
import sanitizeHtml from "sanitize-html";

const extension = joi => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const BaseJoi = Joi.extend(extension);

// Message Schema
const messageSchema = BaseJoi.object({
  senderId: BaseJoi.string().escapeHTML(),
  receiverId: BaseJoi.string().escapeHTML(),
  message: BaseJoi.string().required().escapeHTML(),
});

// User Schema
const userSchema = BaseJoi.object({
  fullName: BaseJoi.string().required().escapeHTML(),
  username: BaseJoi.string().required().escapeHTML(),
  password: BaseJoi.string().min(6).required().escapeHTML(),
  confirmPassword: BaseJoi.string().required().escapeHTML(),
  gender: BaseJoi.string().valid("male", "female").required().escapeHTML(),
  profilePic: BaseJoi.string().default("").escapeHTML(),
});

export { messageSchema, userSchema };
