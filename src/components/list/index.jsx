import React from 'react'
import './index.css'
import Api from '../../api/api'
import DeleteButton from '../button/DeleteButton'
import UpdateButton from '../button/UpdateButton'
import { useState } from 'react'
import AllCheckButton from '../button/AllCheckButton'
import { IoMdCheckmark } from "react-icons/io";

const List = ({list}) => {


console.log('list:',list)
  return (
    <div>   
     {list.length > 0 ? ( list.map((item) => (

        <div key={item.id} className='list'>
          
          <p className='title'>{item.title}</p>
          <div className='buttons'>
          <DeleteButton id={item.id}/>
          <UpdateButton/>
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
