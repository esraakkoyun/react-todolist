import React, { useState } from 'react'
import api from '../../../api/api';
import { useDispatch } from 'react-redux';
import { fetchList } from '../../../redux/features/list-slice';

const Modal = ({setShowModal,item}) => {

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
            dispatch(fetchList())
             closeModal()
           
            })
        }

    return (
      <div className="modal" style={styles.modal}>
        <input type="text" value={text} onChange={handleOnChange}/>
        <div>
        <button onClick={closeModal} className="close-button">Close</button>
        <button className="update-button" onClick={() => update()}>Update</button>
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
      backgroundColor: 'white',
      zIndex: 200,
      width: 300,
      height: 150,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
    }
  };
  

export default Modal