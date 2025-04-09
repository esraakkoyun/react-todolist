import React from "react";
import { useState } from "react";
import api from "../../api/api";
import { fetchList } from "../../redux/features/list-slice";
import { useDispatch } from "react-redux";
import AddButton from "../button/AddButton";
import "./index.css";

const Input = ({ notify }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value); //input a girilen değeri alır.
  };

  return (
    <div className="input-container">
      <input
        className="input"
        placeholder="Listeye bir görev ekleyin"
        value={inputValue} // value olarak input a girilen değeri alır.
        onChange={handleInput} //değişim olduğunda handleInput fonksiyonunu çalıştırır.
      />

      <AddButton inputValue={inputValue} notify={notify} />
    </div>
  );
};

export default Input;
