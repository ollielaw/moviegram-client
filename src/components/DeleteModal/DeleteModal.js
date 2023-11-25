import "./DeleteModal.scss";
import closeIcon from "../../assets/images/close_icon.svg";
import Modal from "react-modal";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const DeleteModal = ({ isPost, handleDelete, data }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#323232";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <button
        type="button"
        className={`modal__delete ${isPost ? "" : "modal__delete--comment"}`}
        onClick={openModal}
      >
        Delete
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <h2
          className="modal__title"
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          {isPost ? "Delete review?" : "Delete comment?"}
        </h2>

        <img
          className="modal__close"
          src={closeIcon}
          alt="close icon"
          onClick={closeModal}
        />

        <p className="modal__description">
          {isPost
            ? `Are you sure you want to delete your review of ${data.movie_name}? This action cannot be undone.`
            : "Are you sure you want to delete your comment? This action cannot be undone."}
        </p>

        <div className="modal__button-container">
          <button
            className="modal__button modal__button--cancel"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="modal__button modal__button--delete"
            onClick={() => {
              setIsOpen(false);
              handleDelete(data.id);
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
