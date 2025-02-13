import React from 'react'
import './index.css'
const AllCheckButton = () => {

  const openAllCheck = (e) => {
    e.target.style.display='block'
  }

  return (
    <div>
        <button className='allCheckButton'>Tümünü Seç</button>
    </div>
  )
}

export default AllCheckButton