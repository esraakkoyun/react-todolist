import React from 'react'
import { useDispatch } from 'react-redux';
import { addList } from '../../../redux/features/add-slice';

const AddButton = ({buttonName, inputValue}) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    const newItem = {title: inputValue};
    console.log('newItem:', newItem)
    api.addItem()
  };


  return (
    <button className='addButton' onClick={handleAdd}>{buttonName}</button>
  )
}

export default AddButton