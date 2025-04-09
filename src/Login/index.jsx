import React, { useEffect, useState } from "react";
import KayitOl from "../Signup";
import { useDispatch } from "react-redux";
import { fetchList } from "../redux/features/list-slice";
import api from "../api/api";
import "./index.css";
import { loginUser } from "../redux/features/user-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const dispatch = useDispatch();

  const handleUSerName = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    setIsRegister(true);
  };

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setMessage("Kullanıcı adı ve şifre boş olamaz");
      return;
    }
    api.user_login(username, password).then((response) => {
      if (response.status === 200) {
        const { token, username, id } = response.data;
        dispatch(loginUser({ token, username }));
        setMessage("Giriş başarılı");
        notify("success", "Giriş başarılı");
        return;
      } else {
        setMessage("Giriş başarısız");
        notify(
          "error",
          "Giriş başarısız. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz."
        );
      }
    });
  };

  return (
    <>
      {isRegister ? (
        <KayitOl notify={notify} />
      ) : (
        <>
          <h1 className="login-title">Login</h1>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={handleUSerName}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={handlePassword}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">
            Giriş Yap
          </button>
          <button onClick={handleRegister} className="login-button">
            Kayıt Olmak için tıklayın
          </button>
        </>
      )}
    </>
  );
};

export default Login;
