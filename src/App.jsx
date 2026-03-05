import { useState } from 'react'
import AboutContent from './content/intro.mdx'
import NeuralCanvasContent from './content/forbidden-city.mdx'
import './App.css'

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
  const page = pages.find(p => p.id === currentPage)

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
