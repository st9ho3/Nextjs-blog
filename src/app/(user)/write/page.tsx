"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import './mystyles.css'
import dynamic from 'next/dynamic';
import TextareaAutosize from 'react-textarea-autosize';
import Modal from '@/app/(components)/Modal/modal';


const Editor = dynamic(() => import("../../../editor/editor"), {ssr: false})

const Writepage = () => {

  const [title, setTitle] = useState<string>("")
  const [tagsModalOpen] = useState<boolean>(true);

  // Access sessionStorage only after the component has mounted
  useEffect(() => {
    const storedTitle = sessionStorage.getItem('articleTitle');
    if (storedTitle) {
      setTitle(JSON.parse(storedTitle));
    }
  }, []);
  
  // Save the title to session storage
  useEffect(() => {
      sessionStorage.setItem('articleTitle', JSON.stringify(title));
    },[title])

  return (
    <main className="main">
     <Modal isOpen={tagsModalOpen} user={undefined} type="tags" />
       
      
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

export default Writepage
