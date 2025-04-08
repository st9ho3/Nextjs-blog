"use client"

import React from 'react'
import "./editor.css"
import { useState, useEffect, useMemo } from 'react'
import { saveToStorage, loadFromStorage } from '@/app/_lib/utils'
import { BlockNoteView } from '@blocknote/mantine'
import "@blocknote/core/fonts/inter.css"
import "@blocknote/core/style.css"

import { BlockNoteEditor, PartialBlock } from '@blocknote/core'

const Editor = () => {

    const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading"); 
 
  // Loads the previously stored editor contents.
  useEffect(() => {
    const content = loadFromStorage('editorContent')
    setInitialContent(content)
  }, []);
 
  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);
 
  if (editor === undefined) {
    return "Loading content...";
  }

    
  return (
    <BlockNoteView
      editor={editor}
      data-changing-font-demo
      theme="light"
      onChange={() => saveToStorage(editor.document)}
      
      />
  )
}

export default Editor
