import React from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import Link from 'next/link';
import './button.css';
import { PublishArticle } from '../_lib/utils';

type Props = {
  text: string;
  param: string;
};

const Button = ({ text, param }: Props) => {
  return (
    <div className="button" onClick={() => param === "/write" ? PublishArticle() : null}>
      <Link href={param !== '/write' ? '/write' : '/'}>
        <FaRegPenToSquare className="write-icon" />
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default Button;
