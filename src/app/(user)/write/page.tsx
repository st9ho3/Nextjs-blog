"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import './mystyles.css'
import dynamic from 'next/dynamic';
import TextareaAutosize from 'react-textarea-autosize';
import Modal from '@/app/(components)/Modal/modal';
import { useRouter } from 'next/navigation';


const Editor = dynamic(() => import("../../../editor/editor"), {ssr: false})

const Writepage = () => {

  const [title, setTitle] = useState<string>("")
  const [tagsModalOpen] = useState<boolean>(true);
  const [auth, setAuth] = useState<string | null>(null);
  const router = useRouter()
  // Access sessionStorage only after the component has mounted
  useEffect(() => {
    const storedTitle = sessionStorage.getItem('articleTitle');
    if (storedTitle) {
      setTitle(JSON.parse(storedTitle));
    }
    const authUser = sessionStorage.getItem("userID") ? setAuth(sessionStorage.getItem("userId")) : null;

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
