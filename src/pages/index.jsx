import React, { useEffect, useState } from 'react'
import Input from '../components/input'
import AddButton from '../components/button/AddButton'
import List from '../components/list'
import './index.css'
import api from '../api/api'
import { useDispatch } from 'react-redux'
import { fetchList } from '../redux/features/list-slice'

const IndexPage = () => {  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList())
  }, [])


  return (
    <div className='container'>
      <h2 className='title'>TODOLİST</h2>
      <div className='addContainer'>
        <Input />
        <AddButton buttonName="ekle" />
      </div>
      <div>
        <List />
      </div>
    </div>
  )
}

export default IndexPage