import React, { useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import api from "../../../api/api";
import { fetchList } from "../../../redux/features/list-slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteButton = ({ id, notify }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    const idsToDelete = [id];

    api
      .deleteItem(idsToDelete)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchList());
          notify("success", "Başarıyla silindi!");
          setIsLoading(false);
        } else {
          setIsLoading(false);
          notify("error", "Silme işlemi başarısız oldu!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { list } = useSelector((state) => state.list); // veri çekmek için

  return (
    <div>
      {list?.length > 0 && (
        <button
          className="deleteButton"
          onClick={() => handleDelete()}
          disabled={isLoading}
        >
          {isLoading ? "Siliniyor..." : "Delete"}
        </button>
      )}
    </div>
  );
};

export default DeleteButton;
