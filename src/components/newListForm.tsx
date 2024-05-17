type Props = {
  formAction: (formData: FormData) => void;
};

export const NewListForm = ({ formAction }: Props) => (
  <form
    className="form"
    action={formAction}
  >
    <label
      className="h4"
      htmlFor="name"
    >
      Create new list
    </label>
    <input
      type="text"
      name="name"
      placeholder="Give list a name..."
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
