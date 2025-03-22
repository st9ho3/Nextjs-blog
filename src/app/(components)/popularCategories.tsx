import React from 'react'
import Link from 'next/link'
import { trending } from '../_lib/utils'
import './popularCategories.css'

const PopularCategories = async () => {

    const trendingCategories = await trending()
    
  return (
    <div>
       <aside className="sideBar-element" aria-label="Popular Categories">
            <h3 className="trending-title">Δημοφιλή</h3>
            <nav aria-label="Trending categories navigation">
              { trendingCategories.length > 0 ?
                <ul>
                {trendingCategories.map((tag) => (
                  <li key={tag[0]}>
                    <Link
                      href={`?type=${tag[0]?.toLocaleLowerCase()}`}
                      
                      aria-label={`View articles in ${tag[0]}`}
                    >
                      <div className="trending-categories">
                        <h5>{tag[0]}</h5>
                        <p className="articles-number">{tag[1]} άρθρα</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul> : <div className="loading-message">Loading categories...</div>
              }
              
            </nav>
          </aside>
    </div>
  )
}

export default PopularCategories
