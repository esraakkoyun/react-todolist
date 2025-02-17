import React from 'react'
import api from '../../../api/api'
import { useDispatch , useSelector} from 'react-redux'
import { fetchList } from '../../../redux/features/list-slice'

const SelectedDelete = ({selectedItemsArray}) => {
  const dispatch = useDispatch()

  const handleDeleteSelected = () => {
    selectedItemsArray.map((id) =>
      api.deleteItem(id).then((response)=>{
          console.log(response)
          dispatch(fetchList())
        })
    )
    console.log('Seçili olanlar silindi')
  }




  return (
    <div>
         <button  className="deleteSelectedButton" style={styles.button} onClick={handleDeleteSelected}>Seçili olanları sil</button>
    </div>
  )
}

const styles = {
  button: {
    backgroundColor: 'red',
    color: 'white',
    border: '2px solid',
    padding: '10px 15px',
    display: 'block',
    fontSize: '10px',
    marginRight: '10px',  
  }
}
export default SelectedDelete