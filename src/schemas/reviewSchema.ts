import * as yup from "yup";

export const reviewMinLength = 10;
export const reviewMaxLength = 5000;

export const reviewValidationSchema = yup.object().shape({
  content: yup
    .string()
    .trim()
    .required("Review is required")
    .min(reviewMinLength, "Review must be at least " + reviewMinLength + " characters")
    .max(reviewMaxLength, "Review cannot exceed " + reviewMaxLength + " characters"),
});
