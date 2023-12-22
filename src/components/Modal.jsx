/* eslint-disable react/prop-types */
// Modal.jsx



// Modal.jsx
const Modal = ({ isOpen, onClose, children }) => {
    return (
      <>
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="modal-close" onClick={onClose}>
                &times;
              </button>
              <div className="modal-content">{children}</div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Modal;
  