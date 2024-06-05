import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit } from "react-feather";
import { toast } from "react-toastify";
import { updateListName } from "@/services/listService";
import { ErrorMessage } from "@/components/errorMessage";
import { listValidationSchema, listMaxLength, listMinLength } from "@/schemas/listSchema";

interface FormData {
  listName: string;
}

export const RenameListForm = ({ closeModal, id }: { closeModal: () => void; id: number }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(listValidationSchema),
  });

  const [inputValue, setInputValue] = useState("");

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
          Rename list
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
        id="listName"
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
        Rename
      </button>
    </form>
  );
};
