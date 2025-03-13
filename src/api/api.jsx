import axios from "axios";

const applicationJson = "application/json";

export const API_URL_PROD = "http://localhost:8000"; // FastAPI sunucun burada çalışmalı


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
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    return {
      headers: {
        "Content-Type": applicationJson,
        Authorization: `Bearer ${token}`, // Token'ı ekleyelim
        
      },
  
    };
  }
  //veri eklemek için - kullanıcıya göre ekleme yapıyorux
  addItem(newTask){
    console.log("api addITem:",newTask)
     return axios.post(`${this.url}/addtasks`,{title:newTask},this.getHeaders()) 
  }
   // görev verilerini getirmek için
   getList(){
    return axios.get(`${this.url}/gettasks`, this.getHeaders());
  }

  //veri silmek için
  deleteItem(id){
    console.log(id)
    //{id:5}
    //5
    return axios.delete(`${this.url}/deletetasks/${id}`,this.getHeaders()) 
  }

  //veri güncellemek için
  updateItem(id,text){
 
    return axios.put(`${this.url}/updatetasks/${id}`,{title:text},this.getHeaders())
  }

  // Kullanıcı kaydı
  user_register(username, password) {
    return axios.post(`${this.url}/register`, { username, password }, this.getHeaders());
  }

  // Kullanıcı girişi
  user_login(username, password) {
    return axios.post(`${this.url}/login`, { username, password }, this.getHeaders());
  }

 
  

}
export default new API();
