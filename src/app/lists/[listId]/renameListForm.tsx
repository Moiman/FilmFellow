import { Edit } from "react-feather";
import { toast } from "react-toastify";

import { updateListName } from "@/services/listService";

export const RenameListForm = ({ closeModal, id }: { closeModal: () => void; id: number }) => {
  const renameList = async (formData: FormData) => {
    const name = formData.get("name");

    if (name) {
      await updateListName(id, name.toString());
      toast(
        <p>
          List was renamed to <span className="highlight-text">{name.toString()}</span>
        </p>,
        {
          icon: <Edit strokeWidth={2.5} />,
          className: "yellow-toast",
        },
      );

      closeModal();
    }
  };

  return (
    <form
      className="form"
      action={renameList}
    >
      <label
        className="h4"
        htmlFor="name"
      >
        Rename list
      </label>
      <input
        type="text"
        name="name"
        placeholder="Give list a new name..."
        required
      />
      <button
        className="list-form-button"
        type="submit"
      >
        Rename
      </button>
    </form>
  );
};
