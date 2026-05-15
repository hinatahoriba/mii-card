import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import i18n from '../i18n'
import { useDecodedCard } from '../hooks/useCardParams'
import CardLoadingAnimation from '../features/business-card/CardLoadingAnimation'
import CardFlipContainer from '../features/business-card/CardFlipContainer'

export default function CardPage() {
  const config = useDecodedCard()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!config) return
    i18n.changeLanguage(config.locale)
    document.title = config.name
  }, [config])

  if (!config) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          fontFamily: 'sans-serif',
        }}
      >
        <p style={{ fontSize: '18px', margin: 0, color: '#374151' }}>
          名刺が見つかりません / Card not found
        </p>
        <Link to="/" style={{ color: '#6366f1', textDecoration: 'underline' }}>
          トップへ戻る / Back to Top
        </Link>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        backgroundColor: '#f3f4f6',
        padding: '16px',
      }}
    >
      {loading && (
        <CardLoadingAnimation onComplete={() => setLoading(false)} />
      )}
      {!loading && <CardFlipContainer config={config} />}
    </div>
  )
}
