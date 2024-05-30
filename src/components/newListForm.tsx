import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

type Props = {
  formAction: (formData: FormData) => void;
};

interface FormData {
  listName: string;
}

const validationSchema = yup.object().shape({
  listName: yup
    .string()
    .trim()
    .required("List name is required")
    .min(3, "List name must be at least 3 characters")
    .max(50, "List name cannot exceed 50 characters"),
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
          className={inputValue.length <= 50 ? "description grey" : "description pink"}
        >
          {inputValue.length}/50
        </p>
      </div>
      <input
        type="text"
        placeholder="Give list a name..."
        {...register("listName")}
        onChange={e => setInputValue(e.target.value)}
        required
      />
      {errors.listName && <p className="error-message pink">{errors.listName.message}</p>}
      <button
        className="list-form-button"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};
