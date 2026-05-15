import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { useDecodedCard } from '../hooks/useCardParams'
import { usePageMeta } from '../hooks/usePageMeta'
import CardLoadingAnimation from '../features/business-card/CardLoadingAnimation'
import CardFlipContainer from '../features/business-card/CardFlipContainer'
import { useEffect } from 'react'

export default function CardPage() {
  const config = useDecodedCard()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!config) return
    i18n.changeLanguage(config.locale)
  }, [config])

  usePageMeta(
    config
      ? {
          title: config.locale === 'ja'
            ? `${config.name}さんのデジタル名刺`
            : `${config.name}'s Digital Business Card`,
          ogTitle: config.locale === 'ja'
            ? `${config.name}さんのデジタル名刺`
            : `${config.name}'s Digital Business Card`,
          ogDescription: [config.company, config.title].filter(Boolean).join(' / '),
          ogUrl: window.location.href,
        }
      : { title: 'mii-card' },
  )

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
          {t('card.notFound')}
        </p>
        <Link to="/" style={{ color: '#6366f1', textDecoration: 'underline' }}>
          {t('card.backToTop')}
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
        boxSizing: 'border-box',
      }}
    >
      {loading && (
        <CardLoadingAnimation onComplete={() => setLoading(false)} />
      )}
      {!loading && <CardFlipContainer config={config} />}
    </div>
  )
}
