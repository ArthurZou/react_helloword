import { useState } from 'react'
import IntroContent from './content/intro.mdx'
import ForbiddenCity from './content/forbidden-city.mdx'
import './App.css'

const pages = [
  {
    id: 'intro',
    title: 'Hello from MDX',
    subtitle: '探索 MDX 与 React 组件的结合',
    component: IntroContent,
  },
  {
    id: 'forbidden-city',
    title: '故宫——紫禁城的前世今生',
    subtitle: '中国明清两代的皇家宫殿，世界文化遗产',
    component: ForbiddenCity,
  },
]

function App() {
  const [currentPage, setCurrentPage] = useState(null)
  const page = pages.find(p => p.id === currentPage)

  return (
    <div className="app-container">
      <nav className="nav">
        <button
          className={`nav-link ${currentPage === null ? 'active' : ''}`}
          onClick={() => setCurrentPage(null)}
        >
          首页
        </button>
        {pages.map(p => (
          <button
            key={p.id}
            className={`nav-link ${currentPage === p.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(p.id)}
          >
            {p.title}
          </button>
        ))}
      </nav>

      <main className="content">
        {page === undefined ? (
          <div className="home">
            <h1 className="home-title">内容导航</h1>
            <p className="home-subtitle">选择一篇文章开始阅读</p>
            <div className="nav-cards">
              {pages.map(p => (
                <button
                  key={p.id}
                  className="nav-card"
                  onClick={() => setCurrentPage(p.id)}
                >
                  <span className="nav-card-title">{p.title}</span>
                  <span className="nav-card-subtitle">{p.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <article className="article">
            <button className="back-link" onClick={() => setCurrentPage(null)}>
              ← 返回首页
            </button>
            <page.component />
          </article>
        )}
      </main>
    </div>
  )
}

export default App
