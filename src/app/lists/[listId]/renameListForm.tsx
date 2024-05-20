type Props = {
  formAction: (formData: FormData) => void;
};

export const RenameListForm = ({ formAction }: Props) => (
  <form
    className="form"
    action={formAction}
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
