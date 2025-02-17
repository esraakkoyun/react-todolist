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
      <div className="modal" style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'yellow', padding: '50px', zIndex: 1000}}>
        <input type="text" value={text} onChange={handleOnChange}/>
        <div>
        <button onClick={closeModal} className="close-button">Close</button>
        <button className="update-button" onClick={() => update()}>Update</button>
        </div>
      </div>
    );
  };
  

export default Modal