import ArticlePreview from '@/app/(components)/articlePreview'
import React from 'react'
import "./home.css"
import "../../(components)/header.css"

const articles = [
  {
    image: "demo.jpeg",
    profile: "man.png",
    name: "Alex Johnson",
    id: "101",
    title: "The Future of AI: Trends to Watch",
    subtitle: "Exploring groundbreaking advancements in artificial intelligence.",
    date: new Date().toLocaleDateString(),
    claps: 120,
    comments: 35,
    saves: 50,
    tags: ["AI", "technology", "innovation"]
  },
  {
    image: "demo.jpeg",
    profile: "man.png",
    name: "Maria Papadakis",
    id: "102",
    title: "Sustainable Energy Solutions",
    subtitle: "How science is driving the shift to renewable energy sources.",
    date: new Date().toLocaleDateString(),
    claps: 75,
    comments: 20,
    saves: 30,
    tags: ["energy", "science", "climate change"]
  },
  {
    image: "demo.jpeg",
    profile: "man.png",
    name: "Takashi Yamamoto",
    id: "103",
    title: "Mathematics in Everyday Life",
    subtitle: "The hidden applications of math that shape our world.",
    date: new Date().toLocaleDateString(),
    claps: 90,
    comments: 15,
    saves: 40,
    tags: ["math", "education", "daily life"]
  },
  {
    image: "demo.jpeg",
    profile: "man.png",
    name: "Sophia Martinez",
    id: "104",
    title: "Breaking Down Quantum Computing",
    subtitle: "A beginner's guide to the next frontier in tech.",
    date: new Date().toLocaleDateString(),
    claps: 105,
    comments: 25,
    saves: 60,
    tags: ["quantum", "science", "computing"]
  },
  {
    image: "demo.jpeg",
    profile: "man.png",
    name: "James Anderson",
    id: "105",
    title: "The Ethics of Technological Innovation",
    subtitle: "Navigating the moral dilemmas in a tech-driven world.",
    date: new Date().toLocaleDateString(),
    claps: 80,
    comments: 30,
    saves: 45,
    tags: ["ethics", "tech", "society"]
  }
];


const page = () => {
  return (
    <div className='homepage'>
      <div className='home'>
      {articles.map((article) => 
      <ArticlePreview
        key={article.id}
       article={article}
      />
      )}

      </div>
      
    </div>
  )
}

export default page
