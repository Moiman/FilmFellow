import { useState } from "react";
import { Edit } from "react-feather";
import { toast } from "react-toastify";

import { updateListName } from "@/services/listService";
import { listMaxLength, listMinLength } from "@/schemas/listSchema";

export const RenameListForm = ({ closeModal, id }: { closeModal: () => void; id: number }) => {
  const [inputValue, setInputValue] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await updateListName(id, inputValue);

    toast(
      <p>
        List was renamed to <span className="highlight-text">{inputValue}</span>
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
      onSubmit={e => onSubmit(e)}
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
        name="listName"
        id="listName"
        maxLength={listMaxLength}
        minLength={listMinLength}
        placeholder="e.g., Weekend Binge, Must-Watch Thrillers, Horror Movie Marathon"
        onChange={e => setInputValue(e.target.value)}
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
