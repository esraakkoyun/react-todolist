/*
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios' 
import  updateItem  from '../../src/api/updateItem'

export const updateList = createAsyncThunk('list/updateList', async () => { // http isteği yapmak için kullanılır.
    const response = await updateItem(id , updateItem) 
    return response // gelen veri döndürülür.
  })

const initialState = { // başlangıç state i
    list: [], // başlangıç state i
    status: 'idle', // başlangıç state i
  }


   export const updateSlice = createSlice({  
      name: 'updateList',  // slice ismi
      initialState, // başlangıç state i
      reducers: { 
         
      },

      })

// Eğer default export gerekiyorsa şu şekilde olmalı:
export default updateSlice.reducer;*/