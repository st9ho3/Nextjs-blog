"use client";

import React, { use, useEffect, useState } from 'react';
import Button from './button';
import Link from 'next/link';
import './header.css';
import '../global.css';
import { LuMenu } from 'react-icons/lu';
import { usePathname } from 'next/navigation';
import Image from 'next/image';


const Header = () => {

  const isWrite: string = usePathname();
  
  
  useEffect(() => {
    const header: HTMLElement | null = document.querySelector('.header');
    const handleScroll = () => {
      header?.classList.toggle('fixed', window.scrollY > 0);
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

        <div className="headerRight">
          <Button
            param={isWrite}
            text={isWrite === '/write' ? 'Publish it' : 'Start Writting'}
          />

          <LuMenu className="menu" />

          <Image
            width={50}
            height={50}
            src="/man.png"
            className="profile-info-pic top"
            alt="profile-pic"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
