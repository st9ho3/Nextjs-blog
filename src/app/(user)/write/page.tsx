"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import './mystyles.css'
import dynamic from 'next/dynamic';
import TextareaAutosize from 'react-textarea-autosize';


const Editor = dynamic(() => import("../../../editor/editor"), {ssr: false})

const page = () => {

  const [title, setTitle] = useState<string>("")

  // Access sessionStorage only after the component has mounted
  useEffect(() => {
    const storedTitle = sessionStorage.getItem('articleTitle');
    if (storedTitle) {
      setTitle(JSON.parse(storedTitle));
    }
  }, []);
  
  // Save the title to session storage
  useEffect(() => {
    if (title) {
      sessionStorage.setItem('articleTitle', JSON.stringify(title));
    }
  },[title])

  return (
    <main className="main">
      <div className="container">
        <TextareaAutosize
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          className="custom-textarea"
        />
        <Editor />
      </div>
    </main>
  )
}

export default page
