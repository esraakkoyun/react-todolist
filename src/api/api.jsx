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
  //veri eklemek için
  addItem(newTask){
     return axios.post(`${this.url}/list`,{title:newTask}) 
  }
   //veri getirmek için
  getList(){
    return axios.get(`${this.url}/list`,this.getHeaders())
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
    console.log("api id ve text:",id,text)
    return axios.put(`${this.url}/list/${id}`,{title:text},this.getHeaders())
  }


}
export default new API();
