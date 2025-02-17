import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const addList = createAsyncThunk('list/addList', async (newItem) => { // http isteği yapmak için kullanılır.
    const response = await api.addItem(newItem) // api den gelen veri response a atanır. 
    console.log('addList görev:', response)
    return response // gelen veri döndürülür.
  })

const initialState = { // başlangıç state i
    list: [], // başlangıç state i
    status: 'idle', // başlangıç state i
  }


   export const addSlice = createSlice({  
      name: 'addList',  // slice ismi
      initialState, // başlangıç state i
      reducers: { 
         
      },
      extraReducers: (builder) => {
        builder
          .addCase(addList.pending, (state,action) => {
            state.status = 'loading';
          })
          .addCase(addList.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.list.push(action.payload); // yeni eklenen görev listeye eklenir.
            console.log('payload görev:', action.payload)
          })
          .addCase(addList.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      }
    

      })

// Eğer default export gerekiyorsa şu şekilde olmalı:
export default addSlice.reducer;
