import React, { useState,useEffect } from 'react'
import { use } from 'react'
import AllCheckButton from '../AllCheckButton'

const CheckBoxButton = ({id,selectedItemsArray,handleCheckBox}) => {
  const isChecked = selectedItemsArray.includes(id); // Checkbox'ın seçili olup olmadığını kontrol et.

  
  
const handleClick = (e) => {
  console.log('seçildi')
  handleCheckBox(id,e.target.checked)
}

  return (
    <div>
        <input type="checkbox" checked={isChecked} onChange={handleClick}/>
    </div>
  )
}



export default CheckBoxButton