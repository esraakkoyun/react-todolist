import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import Login from './Login';
import IndexPage from './pages'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { logoutUser } from './redux/features/user-slice';
function App() {

  
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };


  
  return (
    <>
     {user ? ( // Giriş durumu kontrolü
                <IndexPage onLogout={handleLogout} />
            ) : (
                <Login /> // Giriş bileşenine prop geç
            )}
    </>
  )
}


export default App
