import { useSelector } from 'react-redux';
import './App.css'
import Login from './Login';
import IndexPage from './pages'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }
  const handleLogout = () => {
    setIsLoggedIn(false);
  }
  const handleRegister = () => {
    setIsLoggedIn(true);
  }

  const user = useSelector((state) => state.user);


  return (
    <>
     {isLoggedIn ? ( // Giriş durumu kontrolü
                <IndexPage onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} onRegister={handleRegister} /> // Giriş bileşenine prop geç
            )}
    </>
  )
}


export default App
