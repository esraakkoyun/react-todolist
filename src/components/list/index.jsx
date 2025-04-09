import React from "react";
import "./index.css";
import Api from "../../api/api";
import DeleteButton from "../button/DeleteButton";
import UpdateButton from "../button/UpdateButton";
import { useSelector } from "react-redux";
import CheckBoxButton from "../button/CheckBoxButton/CheckBoxButton";

const List = ({ handleCheckBox, selectedItemsArray, notify }) => {
  const { list } = useSelector((state) => state.list);
  return (
    <div className="list-container">
      {list ? (
        list.map((item) => (
          <div key={item.id} className="list">
            <CheckBoxButton
              id={item.id}
              selectedItemsArray={selectedItemsArray}
              handleCheckBox={handleCheckBox}
            />
            <p className="title">{item.title}</p>
            <div className="buttons">
              <DeleteButton id={item.id} notify={notify} />
              <UpdateButton item={item} notify={notify} />
            </div>
          </div>
        ))
      ) : (
        <p className="empty">Liste boş. Görev ekleyin!</p>
      )}
    </div>
  );
};

export default List;
