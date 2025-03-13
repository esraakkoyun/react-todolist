import React , {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { fetchList } from '../redux/features/list-slice';
import api from '../api/api';

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
    if (!username || !password) {
        setMessage('Kullanıcı adı ve şifre boş olamaz');
        return;
    }
    api.user_register(username, password)
    .then((response) => {
        if (response.status === 200) {
            console.log('Kayıt başarılı', response.data);
            setMessage('Kayıt başarılı');
            onRegister();
            return;
        }
        else {
            console.log('Kayıt başarısız');
            setMessage('Kayıt başarısız');
        }
    })
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