import { configureStore } from '@reduxjs/toolkit'
import listReducer from './features/list-slice'
import userReducer from './features/user-slice'
//import updateReducer, { updateList } from './features/update-slice'

// slice ları toplayan bir depo gibi düşünebiliriz.
export const store = configureStore({
  reducer: {
    list: listReducer,
    user: userReducer,



},
})

 