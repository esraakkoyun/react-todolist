import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearList } from '../../../redux/features/clear-list';

const Logout = ({onLogout}) => {
  const dispatch = useDispatch();
 

  const handleLogout = () => {
    localStorage.removeItem('userId');  //kullanıcı çıkış yapıldığında userId'yi localStorage'den siler
    //localStorage.removeItem('access_token');  //kullanıcı çıkış yapıldığında access_token'ı localStorage'den siler
    dispatch(clearList());
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