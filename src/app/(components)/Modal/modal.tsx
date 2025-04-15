"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
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

const Modal = ({ user, type, isOpen}: {user: Author | undefined, type: Type, isOpen: boolean}) => {
    const [open, setOpen] = useState(isOpen);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const tags = Tags;
 
    const chooseTags = (tags: string[]): void => {
      sessionStorage.setItem("Categories",JSON.stringify(tags))
      setOpen(false);
    }
  

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
      setOpen(false);
      };
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open])
  console.log(open)
  return (
    <>
    
      {open && (
      <div className={`ModalBackground-${type}`}>
        <div className={`${type}-modal-overlay`} onClick={() => setOpen(false)}>
          <div className={`tags-modal-content`} onClick={(e) => e.stopPropagation()}>
            <IoClose 
              className="tags-modal-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
            />
            
            {type === 'tags' ? (
              <>
                <h3 className="tags-modal-title">Choose category</h3>
                <div className="tags-container">
                  {tags.map((tag) => (
                    <span 
                      key={tag}
                      onClick={() => {
                        if (!selectedTags.includes(tag)) {
                          setSelectedTags((prev) => [...prev, tag]);
                        } else {
                          setSelectedTags((prev) => prev.filter((t)=> t !== tag) )
                        }
                      }}
                      className={`tag-pill ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className='profile-logout-btn tagbutton' onClick={() => chooseTags(selectedTags) }>Apply</div>
              </>
            ) : type === 'profile' ? (
              <div className="profile-modal-content">
                {sessionStorage.getItem("userId") && (
                  <>
                    <Image 
                      width={50}
                      height={50}
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
