import axios from "axios"

const BASE_URL = "https://67a4a35cc0ac39787a1bf756.mockapi.io/api/v1/:list"

 const deleteItem = async (id) => {
  console.log('deleteItemapi id:',id)
  try {
    await axios.delete(`${BASE_URL}/${id}`); // Silme işlemi için DELETE metodu kullanıyoruz
    //console.log('Silinen görev:', response.data);
    return id;  // Silinen öğenin ID'sini geri döndürüyoruz
  } catch (error) {
    console.log('Error deleting item:', error);
    throw error;
  }
};

export default deleteItem; 
