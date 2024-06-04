import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ErrorMessage } from "./errorMessage";
import { validationSchema, listMaxLength, listMinLength } from "@/schemas/listSchema";

type Props = {
  formAction: (formData: FormData) => void;
};

interface FormData {
  listName: string;
}

export const NewListForm = ({ formAction }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [inputValue, setInputValue] = useState("");

  return (
    <form
      className="form"
      onSubmit={handleSubmit(formAction)}
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
          className={
            inputValue.length <= listMaxLength && inputValue.length >= listMinLength
              ? "description grey"
              : "description pink"
          }
        >
          {inputValue.length}/{listMaxLength}
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
