"use client"

import React from 'react';
import { useEffect } from 'react';
import Button from './button';
import Link from 'next/link';
import "./header.css";
import "../global.css";
import { LuMenu } from 'react-icons/lu';
import {  Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';


const inter = Inter({
  weight: ['100', '500'], // Inter weights (100 to 900)
  subsets: ['latin'], // Use the desired subset
});

const Header = () => {
  
  const isWrite: string = usePathname()

  useEffect(() => {
      const header: any = document.querySelector('.header');
      const handleScroll = () => {
        header.classList.toggle('fixed', window.scrollY > 0);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
  return (
    <div>
      <div className="header">
        <Link className="navlink" href="/">
          <h1 style={{ color: 'grey', fontFamily: 'Noto Serif Display' }}>
            Λ<span style={{ color: 'black' }}>og</span>
          </h1>
        </Link>

        <div className='headerRight'>
        <Button
          param={isWrite}
          text={isWrite === "/write" ? 'Publish it' : 'Write an article'}
        />

        <LuMenu className="menu" />
        
        <img
          src='man.png'
          className="profile-info-pic top"
          alt="profile-pic"
        />
        </div>

       
      </div>
    </div>
  );
};

export default Header;
