import React from 'react'

export interface MaintenanceProps {
  state?: 'maintenance' | 'construction' | 'coming-soon' | string
}

export const Maintenance: React.FC<MaintenanceProps> = ({ state }) => {
  const titles = {
    maintenance: 'Sito in Manutenzione',
    construction: 'Sito in Costruzione',
  }

  const messages = {
    maintenance:
      'Stiamo lavorando per migliorare la tua esperienza. Torneremo online il prima possibile.',
    construction: 'Stiamo costruendo qualcosa di straordinario. Torna a trovarci presto!',
  }

  const title = titles[state as keyof typeof titles] || 'Sito non disponibile'
  const message =
    messages[state as keyof typeof messages] || 'Il sito è temporaneamente non raggiungibile.'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#f9fafb',
        color: '#111827',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h1>
      <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '600px' }}>{message}</p>
    </div>
  )
}
