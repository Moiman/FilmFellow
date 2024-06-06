import { toast } from "react-toastify";
import { AlertTriangle } from "react-feather";

export const errorToast = (error: unknown) => {
  if (error instanceof Error) {
    toast(
      <p>
        <span className="highlight-text">Error:</span> {error.message} {}
      </p>,
      {
        icon: <AlertTriangle className={"pink-icon"} />,
        className: "pink-toast",
      },
    );
  } else {
    toast(
      <p>
        <span className="highlight-text">Unkown error</span> {}
      </p>,
      {
        icon: <AlertTriangle className={"pink-icon-filled"} />,
        className: "pink-toast",
      },
    );
  }
};
