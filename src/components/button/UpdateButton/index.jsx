import React from "react";
import "./index.css";
import Modal from "./Modal";
import { useState } from "react";
const UpdateButton = ({ item, notify }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button className="updateButton" onClick={openModal}>
        Update
      </button>
      {showModal ? (
        <Modal setShowModal={setShowModal} item={item} notify={notify} />
      ) : null}
    </div>
  );
};

export default UpdateButton;
