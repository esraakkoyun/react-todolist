import React, { useEffect } from 'react'
import Input from '../components/input'
import AddButton from '../components/button/AddButton'
import List from '../components/list'
import Api from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchList } from '../../redux/features/list-slice'
import './index.css'
import { useState } from 'react'
import { addList } from '../../redux/features/add-slice'
import { use } from 'react'
import { deleteList } from '../../redux/features/delete-slice'
import AllCheckButton from '../components/button/AllCheckButton'

const IndexPage = ({inputValue}) => {

 

  const dispatch = useDispatch() 


  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])

  


  const {list} = useSelector((state) => state.list) // veri çekmek için 
  console.log(list)


  return (
    <div className='container'>
        <h2 className='title'>TODOLİST</h2>
        <div className='addContainer'>
          <AllCheckButton/>
            <Input inputValue={inputValue}/>
            <AddButton buttonName="ekle"  inputValue={inputValue}/>
        </div>
        <div>

        <List list={list}/>
      
        </div>
      </div>
  )
}

export default IndexPage