import React from 'react'
import Link from 'next/link';
import { BsFeather } from 'react-icons/bs';
import './topWriters.css'
import { sortAuthors } from '../_lib/utils';
import Image from 'next/image';
import { getAllAuthors } from '../_db/services';

const TopWriters = async () => {

  const authors = await getAllAuthors();
  const sortedAuthors = sortAuthors(authors)

  return (
     <aside className="sideBar-element" aria-label="Top Writers">
          <h3 className="trending-title">
            Top writers <BsFeather style={{ fontSize: '1rem' }} />
          </h3>
          {sortedAuthors ? <nav aria-label="Top writers navigation">
            <ul>
              {sortedAuthors.map((user) => (
                <li key={user.id}>
                  <Link
                    href={`/${user.id}`}
                    aria-label={`View articles by ${user.name}`}
                  >
                    <div className="trending-writers">
                      <Image
                        height={50}
                        width={50}
                        className="profile-info-pic"
                        src={user.profilePicture}
                        alt={`Profile picture of ${user.name}`}
                      />
                      <div className="trending-categories writers">
                        <h5>{user.name}</h5>
                        <p className="articles-number">
                          {user.articles?.length || 0} άρθρα
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav> : <p>Loading Writers...</p> }
        </aside>
  )
}


export default TopWriters
