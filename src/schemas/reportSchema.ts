import * as yup from "yup";

export const reportMinLength = 10;
export const reportMaxLength = 500;

export const validationSchema = yup.object().shape({
  report: yup
    .string()
    .trim()
    .required("Report is required")
    .min(reportMinLength, "Review must be at least " + reportMinLength + " characters")
    .max(reportMaxLength, "Report cannot exceed " + reportMaxLength + " characters"),
});
