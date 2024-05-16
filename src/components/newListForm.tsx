type Props = {
  formAction: (formData: FormData) => void;
};

export const NewListForm = ({ formAction }: Props) => (
  <form
    className="form"
    action={formAction}
  >
    <label>List name</label>
    <input
      type="text"
      name="name"
      placeholder="list name..."
      required
    />
    <button
      className="form-submit"
      type="submit"
    >
      Create new list
    </button>
  </form>
);
