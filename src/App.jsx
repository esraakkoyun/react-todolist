import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IndexPage from './pages'
import { fetchList } from '../redux/features/list-slice'
import { useDispatch } from 'react-redux'


function App() {

  const dispatch = useDispatch();
  
  useEffect(() => { 
    dispatch(fetchList())

  },[dispatch])

  return (
    <>
     <IndexPage/>
    </>
  )
}

export default App
