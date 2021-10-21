import React, {Dispatch, FC} from 'react';
import "./Modal.css"

interface ModalProps {
  active: boolean
  setActive: Dispatch<React.SetStateAction<boolean>>
}

const Modal: FC<ModalProps> =
  ({
     active,
     setActive,
     children
  }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={"modal__btn"}
          onClick={() => setActive(false)}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;