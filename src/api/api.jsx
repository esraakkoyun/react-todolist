import axios from "axios";

const applicationJson = "application/json";

export const API_URL_PROD = "https://67a4a35cc0ac39787a1bf756.mockapi.io/api/v1";

class API {
  constructor() {
    this.url = API_URL_PROD;

    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }
  getSaklabanlık(){
    console.log("Polat SSB Crudfab")
  }
  

  getHeaders() {   
    return {
      headers: {
        "Content-Type": applicationJson,
      },
  
    };
  }
  //veri eklemek için - kullanıcıya göre ekleme yapıyorux
  addItem(newTask){
    const userId = localStorage.getItem('userId');
    console.log("api add userId:",userId)
     return axios.post(`${this.url}/list`,{title:newTask,userId:userId},this.getHeaders()) 
  }
   // görev verilerini getirmek için
   getList(){
    const userId = localStorage.getItem('userId');
    return axios.get(`${this.url}/list?userId=${userId}`, this.getHeaders()); // userId'yi alır ve o id'ye ait görevleri getirir
  }

  //veri silmek için
  deleteItem(id){
    console.log(id)
    //{id:5}
    //5
    return axios.delete(`${this.url}/list/${id}`,this.getHeaders()) 
  }

  //veri güncellemek için
  updateItem(id,text){
    const userId = localStorage.getItem('userId');
    console.log("api id ve text:",id,text)
    return axios.put(`${this.url}/list/${id}`,{title:text,userId:userId},this.getHeaders())
  }


}
export default new API();
