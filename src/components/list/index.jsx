import React from 'react'
import './index.css'
import Api from '../../api/api'
import DeleteButton from '../button/DeleteButton'
import UpdateButton from '../button/UpdateButton'
import { useSelector } from 'react-redux'

const List = () => {
  const {list} = useSelector((state) => state.list)
  console.log(list)
  return (
    <div>   
     
     {list? (list.map((item) => (
        <div key={item.id} className='list'>
          <p className='title'>{item.title}</p>
          <div className='buttons'>
          <DeleteButton id={item.id}/>
          <UpdateButton/>
          </div>
      
        </div>
      ))): (
        <p className='empty'>Liste boş. Görev ekleyin!</p>
      )}
      
     

      
  </div>
  )
}

export default List
