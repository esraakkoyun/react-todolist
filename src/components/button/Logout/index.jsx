import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({onLogout}) => {
 

  const handleLogout = () => {
    console.log('çıkış yap butonuna basıldı')
    onLogout();

  }
  return (
    <div>
        <button onClick={handleLogout}> Çıkış Yap</button>
    </div> 
  )
}

export default Logout