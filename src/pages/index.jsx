import React, { useEffect } from 'react'
import Input from '../components/input'
import AddButton from '../components/button/AddButton'
import List from '../components/list'
import Api from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchList } from '../../redux/features/list-slice'
import './index.css'


const IndexPage = () => {
 
  const dispatch = useDispatch() 

  useEffect(() => {
    dispatch(fetchList())
  }, [])

  const {list} = useSelector((state) => state.list) // veri çekmek için 
  console.log(list)



  return (
    <div className='container'>
        <h2 className='title'>TODOLİST</h2>
        <div className='addContainer'>
            <Input/>
            <AddButton buttonName="ekle"/>
        </div>
        <div>

        <List list={list}/>
      
        </div>
      </div>
  )
}

export default IndexPage