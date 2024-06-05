import * as yup from "yup";

export const validateFormData = async (schema: any, formData: any) => {
  try {
    await schema.validate(formData);
  } catch (validationError) {
    if (validationError instanceof yup.ValidationError) {
      throw new Error(validationError.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
