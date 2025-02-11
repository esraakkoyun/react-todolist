import axios from "axios"

const BASE_URL = "https://67a4a35cc0ac39787a1bf756.mockapi.io/api/v1/list"

const List = async() => {
  try{
    const response = await axios.get(BASE_URL)
    console.log(response)
    return response.data
  }
 
  catch(error){
    console.log(error)
    throw error
  }
}
export default List(); // buraya parantez ekle listslice da ekleme 