import React from 'react'
import './index.css'
import Api from '../../api/api'
import DeleteButton from '../button/DeleteButton'
import UpdateButton from '../button/UpdateButton'

const List = ({list}) => {
  //console.log(list)
  return (
    <div>   
     
     {Array.isArray(list) && list.map((item) => (
        <div key={item.id} className='list'>
          <p className='title'>{item.title}</p>
          <div className='buttons'>
          <DeleteButton id={item.id}/>
          <UpdateButton/>
          </div>
        </div>
      ))}
     

      
  </div>
  )
}

export default List
