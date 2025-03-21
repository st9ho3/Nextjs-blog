import React from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import Link from 'next/link';
import './button.css';

type Props = {
  text: string;
  param: string;
};

const Button = ({ text, param }: Props) => {
  return (
    <div className="button">
      <Link href={param !== '/write' ? '/write' : '/'}>
        <FaRegPenToSquare className="write-icon" />
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default Button;
