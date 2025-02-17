import React, { useEffect, useState } from 'react'
import Input from '../components/input'
import AddButton from '../components/button/AddButton'
import List from '../components/list'
import './index.css'
import api from '../api/api'
import { useDispatch,useSelector } from 'react-redux'
import { fetchList } from '../redux/features/list-slice'
import AllCheckButton from '../components/button/AllCheckButton'
import SelectedDelete from '../components/button/SelectedDelete/SelectedDelete'

const IndexPage = () => {  
  const dispatch = useDispatch();
  const [selectedItemsArray, setSelectedItemsArray] = useState([])

  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])

  const { list } = useSelector((state) => state.list)

  //seçilenleri arrayde tut 
  const handleCheckBox = (id,isChecked) => {
    if(isChecked){
      setSelectedItemsArray(selectedItemsArray => [...selectedItemsArray,id])
      console.log('seçilen id:' ,id)
    }else{
      setSelectedItemsArray(selectedItemsArray.filter((item) => item !== id))
    }
  }

  //seçilenleri array e atıyor mu diye kontrol et  console da göster
  useEffect(() => {
    console.log('selectedItemsArray:',selectedItemsArray)
  }
  ,[selectedItemsArray]) 


 
//tümünü seç
  const handleAllCheck = () => {
    if (selectedItemsArray.length === list.length) { 
      setSelectedItemsArray([]); // Hepsi seçiliyse, sıfırla
    } else {
      setSelectedItemsArray(list.map(item => item.id)); // Tümünü seç
    }
  }



  return (
    <div className='container'>
      <h2 className='title'>TODOLİST</h2>
      {selectedItemsArray.length > 0 && (
        
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <AllCheckButton handleAllCheck={handleAllCheck}/>
      <SelectedDelete selectedItemsArray={selectedItemsArray} id={list.id}/>
      </div>
      )}
     
      <div className='addContainer'>
        <Input />
      </div>
      <div >
        <List selectedItemsArray={selectedItemsArray} handleCheckBox={handleCheckBox}/>
      </div>
    </div>
  )
}

export default IndexPage