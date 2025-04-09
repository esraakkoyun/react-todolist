import React from "react";
import "./index.css";
import CheckBoxButton from "../CheckBoxButton/CheckBoxButton";
const AllCheckButton = ({ handleAllCheck }) => {
  const handleAll = () => {
    handleAllCheck();
  };

  return (
    <div>
      <button
        className="allCheckButton"
        style={styles.button}
        onClick={handleAll}
      >
        Tümünü Seç
      </button>
    </div>
  );
};

const styles = {
  button: {
    backgroundColor: "black",
    color: "white",
    border: "2px solid #4CAF50",
    padding: "10px 24px",
    display: "block",
    marginLeft: "10px",
  },
};

export default AllCheckButton;
