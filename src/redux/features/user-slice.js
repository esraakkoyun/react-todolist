import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  // http isteği yapmak için kullanılır.
  const response = await api.getUserById(); // api den gelen veri response a atanır.
  return response.data; // gelen veri döndürülür.
});

const initialState = {
  user: localStorage.getItem("token")
    ? {
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
      }
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      console.log("loginUser:", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      state.user = action.payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      console.log("locastorgeden token sşindi", state.token);
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
