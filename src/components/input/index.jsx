import React from 'react'
import { useState } from 'react'

const Input = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value); //input a girilen değeri alır.
  }
  
  console.log('inputValue Görev:', inputValue)

  return (
    <input 
    className='input' 
    placeholder='Listeye bir görev ekleyin'
    value={inputValue} // value olarak input a girilen değeri alır.
    onChange={handleInput} //değişim olduğunda handleInput fonksiyonunu çalıştırır.
    />
  )
}

export default Input