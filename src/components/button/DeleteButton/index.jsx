import React from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import  {deleteList}  from '../../../../redux/features/delete-slice'
import { useEffect } from 'react'

const DeleteButton = ({id}) => {
  const dispatch = useDispatch() 

  const handleDelete = () => {
    dispatch(deleteList(id))
    console.log('deleteindexin id si:',id)
  }

  const {list} = useSelector((state) => state.list) // veri çekmek için
  

  return (
    <div>
       {list.length > 0 && (
        <button className='deleteButton' onClick={handleDelete}>Delete</button>
          )}
    </div>
  )
}

export default DeleteButton