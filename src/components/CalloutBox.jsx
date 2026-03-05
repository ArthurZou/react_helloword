function CalloutBox({ label }) {
  return (
    <div style={{
      borderLeft: '3px solid #00ff41',
      padding: '0.75em 1.2em',
      margin: '1.5em 0',
      background: '#111111',
    }}>
      <strong>{label}</strong>
    </div>
  )
}

export default CalloutBox
