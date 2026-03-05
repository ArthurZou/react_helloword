import IntroContent from './content/intro.mdx'
import ForbiddenCity from './content/forbidden-city.mdx'
import './App.css'

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2em' }}>
      <IntroContent />
      <hr />
      <ForbiddenCity />
    </div>
  )
}

export default App
