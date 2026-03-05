import { useState } from 'react'
import AboutContent from './content/intro.mdx'
import NeuralCanvasContent from './content/forbidden-city.mdx'
import './App.css'

const mdModules = import.meta.glob('./content/*.md', { eager: true })

const mdPages = Object.entries(mdModules).map(([path, mod]) => {
  const filename = path.replace('./content/', '').replace('.md', '')
  const parts = filename.split('__')
  const num = parts[0]
  const author = parts[1] || ''
  const project = parts[2] || filename
  const displayName = project.replace(/-/g, ' ')
  return { id: filename, num, author, project, displayName, component: mod.default }
}).sort((a, b) => a.num.localeCompare(b.num))

const pages = [
  {
    id: 'about',
    label: '[about]',
    title: 'About & Stack',
    subtitle: 'Who I am and what I build with.',
    component: AboutContent,
  },
  {
    id: 'neural-canvas',
    label: '[AI]',
    title: 'NeuralCanvas',
    subtitle: 'Diffusion model pipeline for generating UI mockups from natural language.',
    component: NeuralCanvasContent,
  },
]

function App() {
  const [currentPage, setCurrentPage] = useState(null)
  const [filter, setFilter] = useState('')

  const mdxPage = pages.find(p => p.id === currentPage)
  const mdPage = mdPages.find(p => p.id === currentPage)
  const page = mdxPage || mdPage

  const filteredRepos = filter
    ? mdPages.filter(p =>
        p.displayName.toLowerCase().includes(filter.toLowerCase()) ||
        p.author.toLowerCase().includes(filter.toLowerCase())
      )
    : mdPages

  return (
    <div className="app-container">
      <nav className="nav">
        <button className="nav-logo" onClick={() => setCurrentPage(null)}>
          ./dev
        </button>
        <div className="nav-links">
          <button
            className={`nav-link ${currentPage === null ? 'active' : ''}`}
            onClick={() => setCurrentPage(null)}
          >
            [home]
          </button>
          {pages.map(p => (
            <button
              key={p.id}
              className={`nav-link ${currentPage === p.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div />
      </nav>

      <main className="content">
        {page === undefined ? (
          <div className="home">
            <section className="hero">
              <span className="hero-eyebrow">&gt; whoami</span>
              <h1 className="hero-title">
                Building things at the edge of <span className="accent">AI</span>.
              </h1>
              <p className="hero-subtitle">
                AI engineer focused on generative models, developer tooling, and fast feedback loops.
                Open source contributor. Always shipping.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => setCurrentPage('about')}>
                  ./about
                </button>
                <button className="btn-outline" onClick={() => setCurrentPage('neural-canvas')}>
                  view projects
                </button>
              </div>
            </section>

            <section className="projects-section">
              <h2>// projects</h2>
              <div className="projects-grid">
                {pages.filter(p => p.id !== 'about').map(p => (
                  <button
                    key={p.id}
                    className="project-card"
                    onClick={() => setCurrentPage(p.id)}
                  >
                    <span className="card-label">{p.label}</span>
                    <span className="card-title">{p.title}</span>
                    <span className="card-subtitle">{p.subtitle}</span>
                    <span className="card-action">read more →</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="repos-section">
              <h2>// repos [{mdPages.length}]</h2>
              <div className="repo-filter">
                <span className="repo-filter-prompt">&gt; filter:</span>
                <input
                  className="repo-filter-input"
                  type="text"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  placeholder="search repos..."
                  spellCheck={false}
                />
              </div>
              <div className="repo-list">
                {filteredRepos.map(p => (
                  <button
                    key={p.id}
                    className="repo-row"
                    onClick={() => setCurrentPage(p.id)}
                  >
                    <span className="repo-num">{p.num}</span>
                    <span className="repo-name">{p.displayName}</span>
                    <span className="repo-author">{p.author}</span>
                    <span className="repo-arrow">→</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <article className="article">
            <button className="back-link" onClick={() => setCurrentPage(null)}>
              ← back
            </button>
            <page.component />
          </article>
        )}
      </main>
    </div>
  )
}

export default App
