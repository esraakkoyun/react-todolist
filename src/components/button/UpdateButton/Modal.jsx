import React, { useState } from 'react'
import api from '../../../api/api';
import { useDispatch } from 'react-redux';
import { fetchList } from '../../../redux/features/list-slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Modal = ({setShowModal,item,notify}) => {

    const [text, setText] = useState(item.title)

    const handleUpdate = () => {
        console.log(text)
    }
    const handleOnChange = (e) => {
        setText(e.target.value); //input a girilen değeri alır.
      }

      const closeModal = () => {
        setShowModal(false);
      }

      const dispatch = useDispatch()

      const update = () => {
        const id=item.id
       api.updateItem(id, text).then((response)=>{
            if(response.status === 200){
                dispatch(fetchList())
                notify('success', 'Güncelleme işlemi başarılı oldu.')
            }
            else{
                notify('error', 'Güncelleme işlemi başarısız oldu.')
            }
             closeModal()
            })
            .catch((error)=>{
                notify('error', 'Güncelleme işlemi başarısız oldu.')
            })
        }

    return (
      <div className="modal" style={styles.modal}>
         <h2 style={styles.title}>Görevi Güncelle</h2>
        <input type="text" value={text} onChange={handleOnChange} style={styles.input}/>
        <div>
        <button onClick={closeModal} className="close-button" style={styles.button}>Close</button>
        <button className="update-button" onClick={() => update()} style={styles.button}>Update</button>
        </div>
      </div>
    );
  };
  
  const styles = {
    modal: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff', // Beyaz arka plan
        zIndex: 200,
        width: '100%',
        maxWidth: '600px', // Genişlik biraz artırıldı
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 25px', // Daha fazla iç boşluk
        borderRadius: '12px', // Daha yuvarlak kenarlar
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)', // Daha belirgin gölge

    },
    title: {
        fontSize: '28px', // Büyük ve dikkat çekici başlık
        marginBottom: '20px', // Başlık ile içerik arasındaki boşluk
        fontWeight: '700', // Daha kalın ve güçlü yazı
        color: '#333333', // Koyu başlık rengi
        textAlign: 'center', // Başlık ortalanmış
        letterSpacing: '1px', // Harfler arası biraz boşluk
    },
    button: {
        backgroundColor: '#ff7f50', // Modern mercan turuncusu
        color: '#ffffff', // Buton metin rengi
        border: 'none', // Kenar yok
        padding: '15px 30px', // Daha geniş ve büyük buton
        borderRadius: '50px', // Tam yuvarlak kenarlar
        fontSize: '18px', // Daha büyük font
        fontWeight: '600', // Buton yazısı kalın
        marginTop: '25px', // Buton üst boşluğu
        marginLeft: '10px', // Buton sol boşluğu
      
    },
    input: {
      width: '70%', // Genişlik
      padding: '10px', // İç boşluk
      marginBottom: '20px', // Alt boşluk
      border: '1px solid #ccc', // Kenar rengi
      borderRadius: '5px', // Kenar yuvarlama
      fontSize: '16px', // Font boyutu
      backgroundColor: 'white',
      color: 'black',
  },
};




export default Modal