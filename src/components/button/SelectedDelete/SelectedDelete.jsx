import React, { useState } from "react";
import api from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../../redux/features/list-slice";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectedDelete = ({ selectedItemsArray }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteSelected = () => {
    setIsLoading(true);
    const pendingToast = toast.info("Siliniyor...");

    api
      .deleteItem(selectedItemsArray)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchList());
          toast.update(pendingToast, {
            render: "Seçili olanlar silindi",
            type: "success",
          });
        } else {
          toast.update(pendingToast, {
            render: "Seçili olanlar silinemedi",
            type: "error",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <button
        className="deleteSelectedButton"
        onClick={handleDeleteSelected}
        disabled={isLoading}
      >
        {isLoading ? "Siliniyor..." : "Seçili olanları sil"}
      </button>
    </div>
  );
};

export default SelectedDelete;
