import * as yup from "yup";

export const validationSchema = yup.object().shape({
  description: yup
    .string()
    .trim()
    .max(255, "Description too long, max length is 255")
    .matches(/^[^<>{};]*$/, "Description contains invalid characters")
    .optional(),
  twitter: yup
    .string()
    .trim()
    .matches(
      /^\w{0,15}$/,
      "Twitter username can only contain letters, numbers, and underscores, with a maximum length of 15 characters",
    )
    .optional(),
  instagram: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9.]{0,30}$/,
      "Instagram username can only contain numbers, letters, and periods, with a maximum length of 30 characters",
    )
    .optional(),
  tiktok: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9._]{0,24}$/,
      "TikTok username can only contain letters, numbers, periods, and underscores, with a maximum length of 24 characters",
    )
    .optional(),
});
