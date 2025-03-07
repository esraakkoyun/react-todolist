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
import Logout from '../components/button/Logout'

const IndexPage = ({onLogout}) => {  
  const dispatch = useDispatch();
  const [selectedItemsArray, setSelectedItemsArray] = useState([])

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // kullanıcı id si alınır
    console.log(' pages userId:',userId)
    if(userId){
      dispatch(fetchList(userId)) // kullanıcı id si gönderilir ve o id'ye ait görevleri getirir
    }
    else{
      console.log('userId bulunamadı')
    }
  }, [dispatch])

  const { list } = useSelector((state) => state.list)

  //seçilenleri arrayde tut 
  const handleCheckBox = (id,isChecked) => {
    if(isChecked){
      setSelectedItemsArray(selectedItemsArray => [...selectedItemsArray,id])
      console.log('seçilen id:' ,id)
    }else{ //seçili değilse arrayden çıkar
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

  const userName = localStorage.getItem('userName');


  return (
    <div className='container'>
      <h2 className='title1'>TODOLİST</h2>
      <h5>Hoşgeldiniz {userName}</h5> 

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
      {list.length === 0 ? (
            <p>Liste boş. Görev ekleyin!</p>
        ) : (
            <List selectedItemsArray={selectedItemsArray} handleCheckBox={handleCheckBox} />
        )}

      </div>
      <div>
        <Logout onLogout={onLogout}/>
      </div>
    </div>
  )
}

export default IndexPage