"use client";

import React, { useEffect, useState } from 'react';
import AuthButton from './authButton';
import Button from './button';
import Link from 'next/link';
import './header.css';
import '../global.css';
import { LuMenu } from 'react-icons/lu';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Modal from './Modal/modal';


const Header = () => {

  const [user, setUser] = useState<Author | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const isWrite: string = usePathname();

  useEffect(() => {
    const storedId = sessionStorage.getItem("userId");
    // userId in sessionStorage is often stored with quotes, remove them
    const userId = storedId ? JSON.parse(storedId) : null;

    if (userId) {
        setLoading(true);
        fetch(`/api/${userId}`) // Fetch specific user
            .then(res => {
                if (!res.ok) {
                   throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
             })
            .then(data => {
                setUser(data);
                console.log("User data fetched:", data);
            })
            .catch(error => {
                console.error("Failed to fetch user data:", error);
                setUser(undefined); // Handle error state
             })
            .finally(() => setLoading(false));
    } else {
        setLoading(false); // No user ID found
    }
}, []); // Runs once on mount
  
  /* useEffect(() => {
    const header: HTMLElement | null = document.querySelector('.header');
    const handleScroll = () => {
      header?.classList.toggle('fixed', window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); */


  return (
    <div>
      <div className="header">
        <Link className="navlink" href="/">
          <h1 style={{ color: 'grey', fontFamily: 'Noto Serif Display' }}>
            Λ<span style={{ color: 'black' }}>og</span>
          </h1>
        </Link>

        <div className="headerRight">
        {profileModalOpen && <Modal
            isOpen={profileModalOpen} 
            user={user} 
            type='profile' 
            /> }
           <Button
            param={isWrite}
            text={isWrite === '/write' ? 'Publish it' : 'Start Writting'}
            author={user}  
          /> 

          <LuMenu className="menu" />
          {user ? !loading && <Image
            width={50}
            height={50}
            src={user?.profilePicture || '/man.png'}
            className="profile-info-pic top"
            alt="profile-pic"
            onClick={() => setProfileModalOpen(!profileModalOpen)}
          /> : <AuthButton text='Sign in'  />}
        </div>
      </div>
    </div>
  );
};

export default Header;
