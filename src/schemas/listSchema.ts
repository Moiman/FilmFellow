import * as yup from "yup";

export const listMinLength = 3;
export const listMaxLength = 50;

export const listValidationSchema = yup.object().shape({
  listName: yup
    .string()
    .trim()
    .required("List name is required")
    .matches(/^[^<>{};]*$/, "List name contains invalid characters")
    .min(listMinLength, `List name must be at least ${listMinLength} characters`)
    .max(listMaxLength, `List name cannot exceed ${listMaxLength} characters`),
});
