import { useState, lazy, Suspense } from 'react'
import './App.css'

const mdRaw = import.meta.glob('./content/*.md', { eager: true, query: '?raw', import: 'default' })
const mdLoaders = import.meta.glob('./content/*.md')

const lazyComponents = Object.fromEntries(
  Object.entries(mdLoaders).map(([path, loader]) => [path, lazy(loader)])
)

const mdPages = Object.entries(mdLoaders).map(([path]) => {
  const filename = path.replace('./content/', '').replace('.md', '')
  const parts = filename.split('__')
  const num = parts[0]
  const author = parts[1] || ''
  const project = parts[2] || filename
  const displayName = project.replace(/-/g, ' ')

  const rawContent = mdRaw[path]
  let imageUrl = ''
  let description = ''

  if (rawContent) {
    const imageMatch = rawContent.match(/!\[.*?\]\((.*?)\)/)
    imageUrl = imageMatch ? imageMatch[1] : ''

    const descMatch = rawContent.match(/>\s*(.+)/m)
    if (descMatch) {
      description = descMatch[1].trim()
    }
  }

  return {
    id: filename, num, author, project, displayName,
    LazyComponent: lazyComponents[path], imageUrl, description
  }
}).sort((a, b) => a.num.localeCompare(b.num))

const CATEGORIES = [
  { id: 'all', label: '[all]', keywords: [] },
  {
    id: 'ai', label: '[ai]',
    keywords: [
      'tensorflow', 'pytorch', 'transformers', 'ollama', 'langchain',
      'deepseek', 'stable-diffusion', 'llama', 'open-webui', 'langflow',
      'dify', 'autogpt', 'generative-ai', 'comfyui', 'gemini',
      'awesome-llm', 'system-prompts',
    ],
  },
  {
    id: 'web', label: '[web]',
    keywords: [
      'react', 'vue', 'bootstrap', 'angular', 'next', 'd3', 'shadcn',
      'ant-design', 'axios', 'supabase', 'create-react-app', 'three',
      'material-ui', 'typescript', 'deno', 'electron', 'tauri',
      'flutter', 'react-native',
    ],
  },
  {
    id: 'tools', label: '[tools]',
    keywords: [
      'vscode', 'neovim', 'ohmyzsh', 'n8n', 'scrcpy', 'excalidraw',
      'yt-dlp', 'youtube-dl', 'powertoys', 'rustdesk', 'clash',
      'kubernetes', 'gitignore', 'iptv', 'v2ray', 'frp', 'terminal',
      'linux', 'opencode', 'awesome-mac', 'awesome-hacking',
      'awesome-selfhosted', 'command-line', 'secret-knowledge',
      'free-for-dev', 'rust-lang', 'golang',
    ],
  },
  {
    id: 'learn', label: '[learn]',
    keywords: [
      'build-your-own-x', 'freecodecamp', 'free-programming-books',
      'developer-roadmap', 'coding-interview-university',
      'system-design-primer', 'awesome-python', 'tech-interview-handbook',
      'cs-notes', 'javascript-algorithms', 'airbnb-javascript',
      '30-seconds-of-code', 'project-based-learning', 'hello-algo',
      'awesome-go', 'python-100-days', 'you-dont-know-js',
      'papers-we-love', 'every-programmer-should-know',
      'nodebestpractices', 'public-apis', 'javaguide',
      'thealgorithms', 'algorithm', 'computer-science',
    ],
  },
]

function categorize(repo) {
  const haystack = `${repo.project} ${repo.author}`.toLowerCase()
  for (const cat of CATEGORIES) {
    if (cat.id === 'all') continue
    if (cat.keywords.some(kw => haystack.includes(kw))) return cat.id
  }
  return 'other'
}

mdPages.forEach(p => { p.category = categorize(p) })

function App() {
  const [currentPage, setCurrentPage] = useState(null)
  const [filter, setFilter] = useState('')
  const [category, setCategory] = useState('all')

  const mdPage = mdPages.find(p => p.id === currentPage)
  const page = mdPage

  const filteredRepos = mdPages.filter(p => {
    const matchesCategory = category === 'all' || p.category === category
    const matchesText = !filter ||
      p.displayName.toLowerCase().includes(filter.toLowerCase()) ||
      p.author.toLowerCase().includes(filter.toLowerCase())
    return matchesCategory && matchesText
  })

  return (
    <div className="app-container">
      <nav className="nav">
        <button className="nav-logo" onClick={() => setCurrentPage(null)}>
          ./dev
        </button>
        <div className="nav-links">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`nav-link ${category === cat.id && currentPage === null ? 'active' : ''}`}
              onClick={() => { setCurrentPage(null); setCategory(cat.id) }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="nav-stat">
          {currentPage === null && (
            <span className="nav-stat-text">{filteredRepos.length}/{mdPages.length}</span>
          )}
        </div>
      </nav>

      <main className="content">
        {page === undefined ? (
          <div className="home">
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
              <div className="repo-grid">
                {filteredRepos.map(p => (
                  <button
                    key={p.id}
                    className="repo-card"
                    onClick={() => setCurrentPage(p.id)}
                  >
                    {p.imageUrl && (
                      <div className="repo-card-image">
                        <img src={p.imageUrl} alt={p.displayName} />
                      </div>
                    )}
                    <div className="repo-card-content">
                      <h3 className="repo-card-title">{p.displayName}</h3>
                      {p.description && (
                        <p className="repo-card-desc">{p.description}</p>
                      )}
                      <p className="repo-card-author">by {p.author}</p>
                    </div>
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
            <Suspense fallback={<div className="loading">loading...</div>}>
              <page.LazyComponent />
            </Suspense>
          </article>
        )}
      </main>
    </div>
  )
}

export default App
