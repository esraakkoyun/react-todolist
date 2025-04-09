import React, { useState, useEffect } from "react";
import { use } from "react";
import AllCheckButton from "../AllCheckButton";

const CheckBoxButton = ({ id, selectedItemsArray, handleCheckBox }) => {
  const isChecked = selectedItemsArray.includes(id); // Checkbox'ın seçili olup olmadığını kontrol et.

  const handleClick = (e) => {
    handleCheckBox(id, e.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleClick}
        style={styles.checkbox}
      />
    </div>
  );
};

const styles = {
  checkbox: {
    width: "20px",
    height: "20px",
  },
};

export default CheckBoxButton;
