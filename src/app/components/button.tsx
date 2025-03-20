import React from 'react'
import { FaRegPenToSquare } from 'react-icons/fa6';
import { FiShare } from 'react-icons/fi';
import Link from 'next/link'

type Props = {
    text: string,
    param: string,
}

const Button = ({ text, param }: Props) => {
  return (
     <div className="button" > 
          <Link href={param !== '/write' ? '/write' : '/'}> 
             <FaRegPenToSquare className='write-icon' /> 
            <span>{text}</span>
          </Link>
             
        </div>
  )
}

export default Button
