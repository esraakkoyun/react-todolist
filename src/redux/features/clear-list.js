import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const clearListSlice = createSlice({
  name: 'clearList',
  initialState,
  reducers: {
    clearList: (state) => {
      state.list = []; // Listeyi temizle
    },
  },
});

// Action'ı dışa aktar
export const { clearList } = clearListSlice.actions;

// Reducer'ı dışa aktar
export default clearListSlice.reducer;