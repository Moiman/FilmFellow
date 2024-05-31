import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { ErrorMessage } from "./errorMessage";

type Props = {
  formAction: (formData: FormData) => void;
};

interface FormData {
  listName: string;
}

const minLength = 3;
const maxLength = 50;

const validationSchema = yup.object().shape({
  listName: yup
    .string()
    .trim()
    .required("List name is required")
    .matches(/^[^<>{};]*$/, "List name contains invalid characters")
    .min(3, "List name must be at least " + minLength + " characters")
    .max(maxLength, "List name cannot exceed " + maxLength + " characters"),
});

export const NewListForm = ({ formAction }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (formData: FormData) => {
    formAction(formData);
  };

  const [inputValue, setInputValue] = useState("");

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <label
          className="h4"
          htmlFor="listName"
        >
          Create new list
        </label>

        <p
          style={{ marginBottom: "4px" }}
          className={inputValue.length <= maxLength ? "description grey" : "description pink"}
        >
          {inputValue.length}/50
        </p>
      </div>
      <input
        type="text"
        placeholder="e.g., Weekend Binge, Must-Watch Thrillers, Horror Movie Marathon"
        {...register("listName")}
        onChange={e => setInputValue(e.target.value)}
        required
      />
      {errors.listName && <ErrorMessage message={errors.listName.message} />}
      <button
        className="list-form-button"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};
