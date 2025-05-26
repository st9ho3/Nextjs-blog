"use client"; // Directive to ensure this component runs on the client-side.

import React, { useEffect, useState } from 'react';
import './mystyles.css'; 
import dynamic from 'next/dynamic'; 
import TextareaAutosize from 'react-textarea-autosize'; 
import Modal from '@/app/(components)/Modal/modal'; 


// Dynamically imports the Editor component, disabling server-side rendering (SSR) for it.

const Editor = dynamic(() => import("../../../editor/editor"), {ssr: false});

const Writepage = () => {

  const [title, setTitle] = useState<string>("");
  const [tagsModalOpen] = useState<boolean>(true);
  
  
  // useEffect hook to load the article title from session storage when the component mounts.
  // This allows persisting the title if the user navigates away and returns.
  useEffect(() => {
    const storedTitle = sessionStorage.getItem('articleTitle'); // Retrieves title from session storage.
    if (storedTitle) {
      setTitle(JSON.parse(storedTitle)); // Sets the component's title state if a stored title exists.
    }
    
  }, []); // The empty dependency array ensures this effect runs only once on mount.
  
  // useEffect hook to save the current article title to session storage whenever the 'title' state changes.
  useEffect(() => {
      sessionStorage.setItem('articleTitle', JSON.stringify(title)); // Stores the title in session storage.
    },[title]); // This effect runs every time the 'title' state changes.

    
  // JSX for the write page layout.
  return (
    <main className="main"> {/* Main container for the page content. */}
      {/* Renders the Modal component, likely for selecting tags for the article. */}
      {/* `user` prop is undefined here, which might be intentional or require a user object. */}
     <Modal isOpen={tagsModalOpen} user={undefined} type="tags" />
       
      
      <div className="container"> {/* Container for the title input and editor. */}
      
        {/* Autosizing textarea for the article title. */}
        <TextareaAutosize
          onChange={(e) => setTitle(e.target.value)} // Updates the title state on input change.
          value={title} // Binds the textarea value to the title state.
          placeholder="Title" // Placeholder text for the title input.
          className="custom-textarea" // CSS class for styling the textarea.
        />
        {/* Renders the dynamically imported Editor component. */}
        <Editor />
      </div>
    </main>
  )
}

export default Writepage; // Exports the Writepage component.