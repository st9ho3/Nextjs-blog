import React from 'react'
import Link from 'next/link';
import { BsFeather } from 'react-icons/bs';
import { getAuthors } from '../_lib/utils';
import { console } from 'inspector';


const TopWriters = async () => {
  const authors =  await getAuthors()
  console.log(authors)
  return (
     <aside className="sideBar-element" aria-label="Top Writers">
          {/* <h3 className="trending-title">
            Top writers <BsFeather style={{ fontSize: '1rem' }} />
          </h3>
          <nav aria-label="Top writers navigation">
            <ul>
              {authors.map((user) => (
                <li key={user.id}>
                  <Link
                    href={`/${user.name}`}
                    aria-label={`View articles by ${user.name}`}
                  >
                    <div className="trending-writers">
                      <img
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
          </nav> */}
        </aside>
  )
}

export default TopWriters
