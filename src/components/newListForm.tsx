import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="h4">
        Create new list
        <input
          type="text"
          placeholder="Give list a name..."
          {...register("listName")}
          required
        />
      </label>
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
