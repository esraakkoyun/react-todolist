import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./Login";
import IndexPage from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { logoutUser } from "./redux/features/user-slice";
import api from "./api/api";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

function App() {
  const notify = (type, message) => {
    Store.addNotification({
      title: type === "success" ? "Başarılı!" : "Hata!",
      message: message,
      type: type,
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
        showIcon: true,
      },
      width: 300,
      className: "notification-container",
    });
  };

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    api.user_logout().then((response) => {
      if (response.status === 200) {
        dispatch(logoutUser());
        notify("success", "Başarıyla çıkış yapıldı.");
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <ReactNotifications />
      {user ? (
        <IndexPage onLogout={handleLogout} notify={notify} />
      ) : (
        <Login notify={notify} />
      )}
    </>
  );
}

export default App;
