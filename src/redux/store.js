import { configureStore } from '@reduxjs/toolkit'
import listReducer from './features/list-slice'
import addReducer, { addList } from './features/add-slice'
import deleteReducer, { deleteList } from './features/delete-slice'
import clearReducer, { clearList } from './features/clear-list'
//import updateReducer, { updateList } from './features/update-slice'

// slice ları toplayan bir depo gibi düşünebiliriz.
export const store = configureStore({
  reducer: {
    list: listReducer,
    addList: addReducer,
    deleteList: deleteReducer,
    clearList: clearReducer,
    //updateList: updateReducer,



},
})

 