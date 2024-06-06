import { useState } from "react";
import { listMaxLength, listMinLength } from "@/schemas/listSchema";

type Props = {
  formAction: (formData: FormData) => void;
};

export const NewListForm = ({ formAction }: Props) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      className="form"
      action={formAction}
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
        name="listName"
        placeholder="e.g., Weekend Binge, Must-Watch Thrillers, Horror Movie Marathon"
        maxLength={listMaxLength}
        minLength={listMinLength}
        onChange={e => setInputValue(e.target.value)}
        required
      />
      <button
        className="list-form-button"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};
