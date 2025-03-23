"use client"

import React, { useEffect, useState, useMemo, useContext, useCallback } from 'react';
import { BlockNoteEditor } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
/* import useFileUpload from '../../hooks/UseFileUpload'; */
import './Write.css';
import { loadFromStorage, saveToStorage } from '../_lib/utils';

const Write = () => {
  const [initialContent, setInitialContent] = useState<unknown>(null); // Use unknown or specific type
  /* const { uploadFile } = useFileUpload({
    storagePath: 'images',
    maxFileSize: 2 * 1024 * 1024,
    allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  }); */

  useEffect(() => {
    const content = loadFromStorage();
    setInitialContent(content);
  }, []);

  const editor = useMemo(() => {
    if (!initialContent) return undefined; // Handle null/undefined initial content
    return BlockNoteEditor.create({
      initialContent: initialContent as any, // Type assertion if necessary
      /* uploadFile, */
    });
  }, [initialContent]);

  const handleEditorChange = useCallback(async () => {
    if (editor) {
      const content = editor.document;
      // Serialize content to JSON-compatible format
      const serializedContent = JSON.parse(JSON.stringify(content));
      saveToStorage(serializedContent);

      // Optional: Save HTML version
      const htmlContent = await editor.blocksToHTMLLossy(content);
      localStorage.setItem('editor-html', htmlContent);
    }
  }, [editor]);

  if (!editor) return 'Loading content...';

  return (
    <div className="writeEditor-container">
      <BlockNoteView
        editor={editor}
        onChange={handleEditorChange}
        theme="light"
      />
    </div>
  );
};

export default Write;