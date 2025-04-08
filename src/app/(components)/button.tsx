import React from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import Link from 'next/link';
import './button.css';
import { PublishArticle } from '../_lib/utils';

type Props = {
  text: string;
  param: string;
  author?: Author;
};

const Button = ({ text, param, author }: Props) => {
  const getRoute = (): string => {
  if (author) {
    if (param !== '/write') {
      return '/write';
    } else {
      return '/';
    }
  } else {
    return '/login';
  }
}
const route = getRoute();
  return (
    <div className="button" onClick={() => param === "/write" ? author && PublishArticle(author) : null}>
      <Link href={route}>
        <FaRegPenToSquare className="write-icon" />
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default Button;
