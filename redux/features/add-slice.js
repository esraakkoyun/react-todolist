/*import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios' 
import  addItem  from '../../src/api/addItem'

export const addList = createAsyncThunk('list/addList', async (newItem) => { // http isteği yapmak için kullanılır.
    const response = await addItem(newItem) // api den gelen veri response a atanır. 
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
          .addCase(addList.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(addList.fulfilled, (state) => {
            state.status = 'succeeded';
          })
          .addCase(addList.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      }
    

      })

// Eğer default export gerekiyorsa şu şekilde olmalı:
export default addSlice.reducer;
*/