import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../redux/features/list-slice";
import api from "../api/api";
import Login from "../Login";
import "./index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KayitOl = ({ notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKayitol = async () => {
    if (!username || !password) {
      setMessage("Kullanıcı adı ve şifre boş olamaz");
      return;
    }
    api.user_register(username, password).then((response) => {
      if (response.status === 200) {
        setMessage("Kayıt başarılı");
        notify("success", "Kayıt başarılı! Şimdi giriş yapınız.");
        setIsLogin(true);
        return;
      } else {
        setMessage("Kayıt başarısız");
      }
    });
  };

  return (
    <>
      {isLogin ? (
        <Login notify={notify} />
      ) : (
        <div>
          <h1 className="signup-title">Kayıt Ol</h1>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={handleUsernameChange}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={handlePasswordChange}
            className="signup-input"
          />
          <button onClick={handleKayitol} className="signup-button">
            Kayıt Ol
          </button>
        </div>
      )}
    </>
  );
};

export default KayitOl;
