import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const fetchList = createAsyncThunk('gettasks/fetchList', async () => { // http isteği yapmak için kullanılır.
    const response = await api.getList() // api den gelen veri response a atanır. 
    return response.data // gelen veri döndürülür.
  })

const initialState = { // başlangıç state i
    list: [], // başlangıç state i+
    status: 'idle', // başlangıç state i
  }


   export const listSlice = createSlice({  
      name: 'list',  // slice ismi
      initialState, // başlangıç state i
      reducers: { 
         
      },
      extraReducers: (builder) => { //http ile verileri çektik ama bunları başlangıç state indeki boşdiziye atamamız gerekiyor. bu işlemi extraReducers ile yaparız.
          builder.addCase(fetchList.pending, (state, action) => {   // veri çekme işlemi başlamadan önce. api isteği yapılmadan önce işlem durumu loading olur.
              state.status = 'loading' // durum loading olur.
          }) 
          .addCase(fetchList.fulfilled, (state, action) => { // veri çekme işlemi başarılı olduğunda. api isteği başarılı olduğunda işlem durumu succeeded olur.
              state.status = 'succeeded' // durum başarılı olur.
              state.list = action.payload// gelen veri state e atanır.
          })
          .addCase(fetchList.rejected, (state, action) => { // veri çekme işlemi başarısız olduğunda. api isteği başarısız olduğunda işlem durumu failed olur.
              state.status = 'failed' // durum failed olur.
          })

          //user da tutulan değeleri çekmek gerekiyor bu da useSelector ile yapılır.
      },

      })

// Eğer default export gerekiyorsa şu şekilde olmalı:
export default listSlice.reducer;