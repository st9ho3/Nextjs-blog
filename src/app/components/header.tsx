import React from 'react'
import Button from './button'
import Link from 'next/link'
import "../global.css"
import { LuMenu } from 'react-icons/lu';


type Params = {
    params: Promise<{page: string}>
}

const Header = async({params}: Params) => {

    const page = params ? (await params).page : "/"
    console.log(page)

  return (
     <div>
          <div className="header">
            <Link className="navlink" href="/" >
              <h1 style={{ color: 'grey', fontFamily: 'Noto Serif Display' }}>
                Λ<span style={{ color: 'black' }}>og</span>
              </h1>
            </Link>
            
            {page !== '/write' ? (
              <Button param={page} text="Write an article" />
            ) : (
              <Button param={page} text="Publish it" />
            )}
      
            <LuMenu
              className="menu"
              
            />
            
             <img
              
             className="profile-info-pic top" 
             
             alt="profile-pic"
              /> 
          </div>
          
    
          {/* Outlet is crucial for rendering nested routes! */}
          
        </div>
  )
}

export default Header
