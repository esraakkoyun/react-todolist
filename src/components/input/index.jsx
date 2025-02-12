import React from 'react'
import { useState } from 'react'
import api from '../../api/api';
import { fetchList } from '../../redux/features/list-slice';
import { useDispatch } from 'react-redux';

const Input = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value); //input a girilen değeri alır.
  }
  const dispatch = useDispatch();
  const handleTask = () =>{
    api.addItem(inputValue).then(()=>{
     dispatch(fetchList())
    })
    
  }
  console.log('inputValue Görev:', inputValue)

  return (
    <div>
    <input 
    className='input' 
    placeholder='Listeye bir görev ekleyin'
    value={inputValue} // value olarak input a girilen değeri alır.
    onChange={handleInput} //değişim olduğunda handleInput fonksiyonunu çalıştırır.
    />
    <button type='button' onClick={()=>handleTask()}></button>
    </div>
  )
}

export default Input