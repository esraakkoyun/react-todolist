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
     return axios.post(`${this.url}/addtasks`,{title:newTask},this.getHeaders()) 
  }
   // görev verilerini getirmek için
   getList(){
    return axios.get(`${this.url}/gettasks`, this.getHeaders());
  }

  //veri silmek için
  deleteItem(selectedItemsArray){
    return axios.delete(`${this.url}/deletetasks`,{ data: { task_ids: selectedItemsArray }, ...this.getHeaders()}) 
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

    // Kullanıcı bilgilerini almak için
    getUserById() {
      return axios.get(`${this.url}/getUserById`, this.getHeaders());
    }  
  
    // Kullanıcı çıkışı
    user_logout() {
      return axios.post(`${this.url}/logout`,{}, this.getHeaders());
    }

 
  

}
export default new API();
