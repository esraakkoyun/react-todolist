import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import api from '../../../api/api';
import { fetchList } from '../../../redux/features/list-slice';


const AddButton = ({buttonName, inputValue}) => {


  const dispatch = useDispatch();

    const handleTask = () =>{
      if(inputValue === ''){
        return alert('Boş bırakılamaz')
      }
      else{
      api.addItem(inputValue).then(()=>{
       dispatch(fetchList())
       console.log("addbutton:",inputValue)
    })}
      
    }


  return (
    <button className='addButton' onClick={()=>handleTask()}>{buttonName}</button>
  )
}

export default AddButton