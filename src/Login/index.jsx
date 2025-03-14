import React, { useEffect, useState } from 'react'
import KayitOl from '../Signup'
import { useDispatch } from 'react-redux';
import { fetchList } from '../redux/features/list-slice';
import api from '../api/api';
import {  loginUser } from '../redux/features/user-slice';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isRegister, setIsRegister] = useState(false);

    const dispatch = useDispatch();

    const handleUSerName = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = () => {
        setIsRegister(true);
    }

    const handleLogin = async () => {
        if (username === '' || password === '') {
            setMessage('Kullanıcı adı ve şifre boş olamaz');
            return;
        }
        api.user_login(username, password)
        .then((response) => {
            if (response.status === 200) {
                const {token, username,id} = response.data;
                dispatch(loginUser({token, username}));
                console.log("Giriş başarılı", {token, username});
                setMessage('Giriş başarılı');
              
                return;
            }
            else {
                console.log("Giriş başarısız")
                setMessage('Giriş başarısız');
            }
            
        })
    }


  return (
    <>
    {isRegister ? (
        <KayitOl />
    ) : (
        <>
        <h1>Login</h1>
        <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={handleUSerName}/>
        <input type="password" placeholder="Şifre" value={password} onChange={handlePassword}/>
        <button onClick={handleLogin}>Giriş Yap</button>
        <button onClick={handleRegister}>Kayıt Olmak için tıklayın</button>
        </>
    )}
    </>
  )
}

export default Login