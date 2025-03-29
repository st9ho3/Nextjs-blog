"use client"

import React from 'react'
import './mystyles.css'
import dynamic from 'next/dynamic';

import TextareaAutosize from 'react-textarea-autosize';

const Editor = dynamic(() => import("../../../editor/editor"), {ssr: false})

const page = () => {

  return (
    <main className="main">
      <div className="container">
        <TextareaAutosize
          placeholder="Title"
          className="custom-textarea"
        />
        <Editor />
      </div>
    </main>
  )
}

export default page
