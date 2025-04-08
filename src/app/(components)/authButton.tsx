import React from 'react'
import Link from 'next/link';
import './button.css';

const AuthButton = ({text}: {text: string}) => {
  return (
    <div className="authButton">
        <Link href="/login">
            <span>{text}</span>
        </Link>
    </div>
  )
}

export default AuthButton
