"use client"

import React from 'react'
import "./editor.css"
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import "@blocknote/core/fonts/inter.css"
import "@blocknote/react/style.css"

interface EditorProps {
    initialContent?: string;
    editable?: boolean;
    onChange?: () => void;
  }

const Editor: React.FC<EditorProps> = (
  {
    editable,
    onChange,
    initialContent
  }) => {

    const editor = useCreateBlockNote(
      {
       initialContent: initialContent ? JSON.parse(initialContent) : undefined,
      }
    )

    
  return (
    <div className='writeEditor-container'>
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme="light"
      onChange={onChange}
      />
    </div>
  )
}

export default Editor
