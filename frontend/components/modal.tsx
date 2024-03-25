import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children, title }: { onClose: any; children: any; title: any }) => {
  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className="modal-overlay">
      {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <a
              href="#"
              onClick={handleCloseClick}
            >
              x
            </a>
          </div>
          {title && <h1>{title}</h1>}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
};

export default Modal;
