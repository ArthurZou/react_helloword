function CalloutBox({ label }) {
  return (
    <div style={{
      border: '2px solid #646cff',
      borderRadius: '8px',
      padding: '1em',
      margin: '1em 0',
    }}>
      <strong>{label}</strong>
    </div>
  )
}

export default CalloutBox
