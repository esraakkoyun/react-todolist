import React from "react";
import { useDispatch } from "react-redux";
import api from "../../../api/api";
import { fetchList } from "../../../redux/features/list-slice";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const AddButton = ({ inputValue, notify }) => {
  const dispatch = useDispatch();

  const handleTask = () => {
    if (inputValue === "") {
      notify("danger", "Boş bırakılamaz!");
    } else {
      api.addItem(inputValue).then(() => {
        dispatch(fetchList());
        notify("success", "Başarıyla eklendi!");
      });
    }
  };

  return (
    <>
      <button className="addButton" onClick={() => handleTask()}>
        Ekle
      </button>
    </>
  );
};

export default AddButton;
