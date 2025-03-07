import React , {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { fetchList } from '../redux/features/list-slice';

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
                localStorage.setItem('userId', data.userId); // kullanıcı kayıt olduğunda userId'yi localStorage'e kaydeder bunu verileri çekmek için kullanırız.
                //localStorage.setItem('access_token', data.access_token); // kullanıcı kayıt olduğunda access_token'ı localStorage'e kaydeder bunu verileri çekmek için kullanırız.
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


    const dispatch = useDispatch();
    useEffect(() => {
        const userId = localStorage.getItem('userId'); // kullanıcı id'si alınır
        console.log('pages userId:', userId);
        if (userId) {
            dispatch(fetchList(userId)); // kullanıcı id'si gönderilir ve o id'ye ait görevleri getirir
        }
    }, [dispatch]);


    
        
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