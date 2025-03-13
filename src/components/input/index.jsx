import React from 'react'
import { useState } from 'react'
import api from '../../api/api';
import { fetchList } from '../../redux/features/list-slice';
import { useDispatch } from 'react-redux';
import AddButton from '../button/AddButton';

const Input = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value); //input a girilen değeri alır.
  }

  


  return (
    <div>
    <input 
    className='input' 
    placeholder='Listeye bir görev ekleyin'
    value={inputValue} // value olarak input a girilen değeri alır.
    onChange={handleInput} //değişim olduğunda handleInput fonksiyonunu çalıştırır.
    />
    
    
    <AddButton buttonName="ekle" inputValue={inputValue} /> 
    </div>
  )
}

export default Input