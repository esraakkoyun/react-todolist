import React from 'react'
import './index.css'
import Api from '../../api/api'
import DeleteButton from '../button/DeleteButton'
import UpdateButton from '../button/UpdateButton'
import { useSelector } from 'react-redux'
import CheckBoxButton from '../button/CheckBoxButton/CheckBoxButton'




const List = ({handleCheckBox,selectedItemsArray}) => {
  const {list} = useSelector((state) => state.list)
  console.log("list",list)
  return (
    <div className='list-container'>   
     
     {list? (list.map((item) => (
        <div key={item.id} className='list'>
          <CheckBoxButton id={item.id} selectedItemsArray={selectedItemsArray} handleCheckBox={handleCheckBox} />
          <p className='title'>{item.title}</p>
          <div className='buttons'>
          <DeleteButton id={item.id}/>
          <UpdateButton item={item}/>
          </div>
      
        </div>
        
      ))): (
        <p className='empty'>Liste boş. Görev ekleyin!</p>
      )
      }
      
     

      
  </div>
  )
}

export default List
