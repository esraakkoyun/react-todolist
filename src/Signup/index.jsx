import React , {useState} from 'react'

const KayitOl = ({onRegister}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleKayitol = async () => {
        if (username === '' || password === '') {
            setMessage('Kullanıcı adı ve şifre boş olamaz');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),  //kullanıcı adı ve şifreyi backende json formatında gönderir
            });
  
            const data = await response.json();  //response'ı json formatında alır
  
            if (response.ok) {
                setMessage('Kullanıcı kaydedildi');
                console.log('Kullanıcı kaydedildi');
            }
            else {
                setMessage(data.detail || 'Kullanıcı kaydedilemedi');
                console.log(data.detail || 'Kullanıcı kaydedilemedi');
            }
        } catch (error) {
            setMessage('Bir hata oluştu');
            console.error('Bir hata oluştu:', error);
        }
        onRegister();
    }


    
        
  return (
    <div>
        <h1>Kayıt Ol</h1>
        <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={handleUsernameChange}/>
        <input type="password" placeholder="Şifre" value={password} onChange={handlePasswordChange}/>
        <button onClick={handleKayitol}>Kayıt Ol</button>
    </div>
  )
}

export default KayitOl