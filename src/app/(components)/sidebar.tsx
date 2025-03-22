import React from 'react'
import TopWriters from './topWriters'
import PopularCategories from './popularCategories'
import "./sidebar.css"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <PopularCategories
        />
      <TopWriters />
    </div>
  )
}

export default Sidebar
