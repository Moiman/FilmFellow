import { AlertCircle } from "react-feather";

export const ErrorMessage = ({ message }: { message: string | undefined }) => {
  return (
    <p className="error-message">
      <AlertCircle
        size={18}
        strokeWidth={2.5}
        className="pink-icon"
      />
      {message}
    </p>
  );
};
