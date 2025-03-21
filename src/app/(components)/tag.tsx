import React from 'react'
import "./tag.css"

const Tag = ({text}: {text: string}) => {
  return (
    <div className='tag'>
      {text}
    </div>
  )
}

export default Tag
