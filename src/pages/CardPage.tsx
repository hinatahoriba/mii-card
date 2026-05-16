import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { useDecodedCard } from '../hooks/useCardParams'
import { usePageMeta } from '../hooks/usePageMeta'
import CardLoadingAnimation from '../features/business-card/CardLoadingAnimation'
import CardFlipContainer from '../features/business-card/CardFlipContainer'
import { BACKGROUNDS } from '../constants/templateSets'

export default function CardPage() {
  const config = useDecodedCard()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const handleLoadComplete = useCallback(() => setLoading(false), [])

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 font-sans bg-neutral-950">
        <p className="text-lg m-0 text-neutral-400">
          {t('card.notFound')}
        </p>
        <Link to="/" className="text-neutral-500 hover:text-white transition-colors underline underline-offset-4 tracking-widest text-sm">
          {t('card.backToTop')}
        </Link>
      </div>
    )
  }

  // Support backward compatibility
  const bgId = config.backgroundId || config.templateSetId || 1
  const background = BACKGROUNDS.find((b) => b.id === bgId) ?? BACKGROUNDS[0]

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center gap-8 bg-neutral-900 p-4 sm:p-8 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        {loading && (
          <CardLoadingAnimation onComplete={handleLoadComplete} />
        )}
        {!loading && <CardFlipContainer config={config} />}
      </div>
    </div>
  )
}
