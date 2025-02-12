import axios from "axios"

const BASE_URL = "https://67a4a35cc0ac39787a1bf756.mockapi.io/api/v1/list"

 const deleteItem = async (id) => {
  console.log('deleteItem api id:',id)
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);  // Silme işlemi için DELETE metodu kullanıyoruz
    console.log('silinen görev:',response.data)
    return id;  // Silinen öğenin ID'sini geri döndürüyoruz
  } catch (error) {
    console.log('Error deleting item:', error);
    if (error.response) {
      console.log('API Error:', error.response.data);
      console.log('Error status:', error.response.status);
    }
    else {
      console.log('Error message:', error.message);
    }
    throw error;
  }
};

export default deleteItem; 
