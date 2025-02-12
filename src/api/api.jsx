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
  addItem(newTask){
     return axios.post(`${this.url}/list`,{title:newTask})
  }
   
  getList(){
    return axios.get(`${this.url}/list`,this.getHeaders())
  }

  deleteItem(deletedItem){
    console.log(deletedItem)
    //{id:5}
    //5
    return axios.delete(`${this.url}/list/${deletedItem.id}`,this.getHeaders())
  }
}
export default new API();
