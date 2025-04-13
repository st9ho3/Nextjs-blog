"use client";
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import './Modal.css';

export const Tags = ["Technology",
    "Design",
    "Programming",
    "Business",
    "Science",
    "Health & Wellness",
    "Education",
    "Travel",
    "Lifestyle",
    "Finance",
    "Arts & Culture",
    "Environment",
    "Politics",
    "Sports",
    "Food & Cooking",
    "Gaming",
    "Fashion",
    "Self-Improvement",
    "History",
    "Parenting",
    "Photography",
    "Music",
    "Film & TV",
    "Career Advice",
    "Relationships",
    "DIY & Crafts",
    "Pets",
    "Spirituality",
    "Real Estate",
    "Automotive"]

const Modal = ({ user, type, isOpen}: {user: Author | undefined, type: Type, isOpen: Boolean}) => {
    const [open, setOpen] = useState<Boolean>(isOpen);
  const tags = Tags;
  

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") {
        setOpen(false);
      };
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open])

  return (
    <>
    
      {open && sessionStorage.getItem("userId") && (
      <div className={`ModalBackground-${type}`}>
        <div className={`${type}-modal-overlay`} onClick={() => setOpen(false)}>
          <div className={`tags-modal-content`} onClick={(e) => e.stopPropagation()}>
            <IoClose 
              className="tags-modal-close-btn"
              /* onClick={() => dispatch({ type: 'CLEAN' })} */
              aria-label="Close modal"
            />
            
            {type === 'tags' ? (
              <>
                <h3 className="tags-modal-title">Choose category</h3>
                <div className="tags-container">
                  {tags.map((tag) => (
                    <span 
                      key={tag}
                      /* onClick={() => dispatch({ type: 'SET_TAGS', payload: tag })} */
                      /* className={`tag-pill ${state.chosenTags.includes(tag) ? 'selected' : ''}`} */
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : type === 'profile' ? (
              <div className="profile-modal-content">
                {sessionStorage.getItem("userId") && (
                  <>
                    <img 
                      src={user?.profilePicture || '/man.png'} 
                      alt="Profile" 
                      className="profile-modal-image"
                    />
                    <h2 className="profile-modal-name">
                      {user?.name || 'User Name'}
                    </h2>
                    
                    <button 
                      className="profile-logout-btn"
                      onClick={() => {
                        localStorage.removeItem('authorizedUser');
                        sessionStorage.removeItem('userId');
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
        </div>
      )}
      </>
    
  )
}

export default Modal;
