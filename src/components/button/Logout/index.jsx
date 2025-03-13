import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearList } from '../../../redux/features/clear-list';
import { logoutUser } from '../../../redux/features/user-slice';

const Logout = ({onLogout}) => {
  const dispatch = useDispatch();
 

  const handleLogout = () => {
    dispatch(logoutUser());
    onLogout();

  }
  return (
    <div>
        <button onClick={handleLogout}> Çıkış Yap</button>
    </div> 
  )
}

export default Logout