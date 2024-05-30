import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit } from "react-feather";
import { toast } from "react-toastify";
import { updateListName } from "@/services/listService";

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

export const RenameListForm = ({ closeModal, id }: { closeModal: () => void; id: number }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData: FormData) => {
    await updateListName(id, formData.listName);
    toast(
      <p>
        List was renamed to <span className="highlight-text">{formData.listName}</span>
      </p>,
      {
        icon: <Edit strokeWidth={2.5} />,
        className: "yellow-toast",
      },
    );
    closeModal();
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="h4">
        Rename list
        <input
          type="text"
          placeholder="Rename your list..."
          {...register("listName")}
          required
        />
      </label>
      {errors.listName && <p className="error-message pink">{errors.listName.message}</p>}
      <button
        className="list-form-button"
        type="submit"
      >
        Rename
      </button>
    </form>
  );
};
