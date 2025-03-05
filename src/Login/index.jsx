import React, { useState } from 'react'
import KayitOl from '../Signup'

const Login = ({ onLogin, onRegister }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isRegister, setIsRegister] = useState(false);

    const handleUSerName = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = () => {
        setIsRegister(true);
    }

    const handleLogin = async() => { 
        if (username === '' || password === '') {  // Kullanıcı adı ve şifre kontrolü
            setMessage('Kullanıcı adı ve şifre boş olamaz');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/login', {  //bu fonksiyon kullanıcı adı ve şifreyi backende gönderir
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),  //kullanıcı adı ve şifreyi backende json formatında gönderir
            });
  
            const data = await response.json();  //response'ı json formatında alır
  
            if (response.ok) {  //response'ın ok olup olmadığını kontrol eder
                localStorage.setItem('token', data.access_token);
                console.log(data.access_token);
                setMessage('Giriş yapıldı');
                console.log('Giriş yapıldı');
                onLogin(); 
            } else {
                setMessage(data.detail || 'Geçersiz kullanıcı adı veya şifre');
                console.log(data.detail || 'Geçersiz kullanıcı adı veya şifre');
            }
        } catch (error) {
            setMessage('Bir hata oluştu');
            console.error('Bir hata oluştu:', error);
        }
    }


  return (
    <>
    {isRegister ? (
        <KayitOl onRegister={onRegister}/>
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