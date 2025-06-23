"use client";

import React, { useEffect, useState } from 'react';
import AuthButton from './authButton';
import Button from './button';
import Link from 'next/link';
import '../global.css'; // Import global styles first
import './header.css'; // Then component-specific styles
import { LuMenu } from 'react-icons/lu';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Modal from './Modal/modal';
import './sidebar.css'; // For the overlay

const Header = () => {

  const [user, setUser] = useState<Author | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isWrite: string = usePathname();

  useEffect(() => {
        setLoading(true);
        fetch(`/api/user`) // Fetch specific user
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
  }, []); // Runs once on mount

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isSidebarOpen]);

  const openModal = () => {
    if (profileModalOpen) {
      setProfileModalOpen(false)
    }
    setProfileModalOpen(!profileModalOpen)
  }

  return (
    <div>
      <div className="header">
        <Link className="navlink" href="/">
          <h1 style={{ color: 'grey', fontFamily: 'Noto Serif Display' }}>
            Λ<span style={{ color: 'black' }}>og</span>
          </h1>
        </Link>
        
        <LuMenu className="menu" onClick={toggleSidebar}/>
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
          <p>{user?.email}</p>

          {user ? !loading && <Image
            width={50}
            height={50}
            src={user?.profilePicture || '/man.png'}
            className="profile-info-pic top"
            alt="profile-pic"
            onClick={openModal}
          /> : <AuthButton text='Sign in'  />  }
        </div>
      </div>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Header;