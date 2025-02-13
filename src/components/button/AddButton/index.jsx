import React from 'react'
import { useDispatch } from 'react-redux';
import { addList } from '../../../../redux/features/add-slice';
import api from '../../../api/api';

const AddButton = ({buttonName, inputValue}) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    const newItem = {title: inputValue || "Varsayılan başlık"};
    console.log('newItem:', newItem)
    dispatch(addList(newItem))
    api.List
  };


  return (
    <button className='addButton' onClick={handleAdd}>{buttonName}</button>
  )
}

export default AddButton