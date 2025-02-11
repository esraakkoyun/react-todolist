
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios' 
import  deleteItem  from '../../src/api/deleteItem'

export const deleteList = createAsyncThunk('list/deleteItem', async (id) => { // http isteği yapmak için kullanılır.
  console.log('deleteslice id:',id)
     await deleteItem(id) // api den gelen veri response a atanır. 
    return id // gelen veri döndürülür.
  })

const initialState = { // başlangıç state i
    list: [], // başlangıç state i
    status: 'idle',
  }


   export const deleteSlice = createSlice({  
      name: 'deleteList',  // slice ismi
      initialState, // başlangıç state i
      reducers: { 
        
      },
      extraReducers: (builder) => { //http ile verileri çektik ama bunları başlangıç state indeki boşdiziye atamamız gerekiyor. bu işlemi extraReducers ile yaparız.
                builder.addCase(deleteList.pending, (state, action) => {   // veri çekme işlemi başlamadan önce. api isteği yapılmadan önce işlem durumu loading olur.
                    state.status = 'loading' // durum loading olur.
                }) 
                .addCase(deleteList.fulfilled, (state, action) => { // veri çekme işlemi başarılı olduğunda. api isteği başarılı olduğunda işlem durumu succeeded olur.
                    state.status = 'succeeded' // durum başarılı olur.
                    state.list = state.list.filter(item => item.id !== action.payload);
                    console.log('extraReducers state:', action.payload);
                })
                .addCase(deleteList.rejected, (state, action) => { // veri çekme işlemi başarısız olduğunda. api isteği başarısız olduğunda işlem durumu failed olur.
                    state.status = 'failed' // durum failed olur.
                })
      
                //user da tutulan değeleri çekmek gerekiyor bu da useSelector ile yapılır.
            },
      
     
      })


// Eğer default export gerekiyorsa şu şekilde olmalı:
export default deleteSlice.reducer;