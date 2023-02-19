import React from "react";

const Modal = ({ children, isModalVisible, setModalVisibility }) => {
  const className = isModalVisible ? "modal visible" : "modal";

  return (
    <div className={className} onClick={() => setModalVisibility(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
