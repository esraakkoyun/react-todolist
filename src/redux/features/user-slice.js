import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



export const fetchUser = createAsyncThunk('user/fetchUser', async () => { // http isteği yapmak için kullanılır.
  const response = await api.getUser() // api den gelen veri response a atanır. 
  return response.data // gelen veri döndürülür.
})

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
      state.user = action.payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      state.user = null

    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

