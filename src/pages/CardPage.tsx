import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { useDecodedCard } from '../hooks/useCardParams'
import { usePageMeta } from '../hooks/usePageMeta'
import CardLoadingAnimation from '../features/business-card/CardLoadingAnimation'
import CardFlipContainer from '../features/business-card/CardFlipContainer'

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-neutral-950 p-4 sm:p-8 relative overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neutral-800/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-neutral-900/50 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col items-center justify-center">
        {loading && (
          <CardLoadingAnimation onComplete={handleLoadComplete} />
        )}
        {!loading && <CardFlipContainer config={config} />}
      </div>
    </div>
  )
}
