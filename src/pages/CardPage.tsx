import { useState } from 'react'
import CardLoadingAnimation from '../features/business-card/CardLoadingAnimation'
import CardFront from '../features/business-card/CardFront'
import CardBack from '../features/business-card/CardBack'
import type { CardConfig } from '../types/card'

const DUMMY_CONFIG: CardConfig = {
  templateSetId: 1,
  name: '山田 太郎',
  company: '株式会社サンプル',
  title: 'フロントエンドエンジニア',
  bio: 'ものづくりが好きです。',
  snsLinks: [
    { platform: 'line', url: 'yamada_taro' },
    { platform: 'instagram', url: 'https://www.instagram.com/yamada_taro/' },
    { platform: 'x', url: 'https://x.com/yamada_taro' },
    { platform: 'github', url: 'https://github.com/yamada-taro' },
    { platform: 'whatsapp', url: '819012345678' },
  ],
  locale: 'ja',
}

export default function CardPage() {
  const [loading, setLoading] = useState(true)

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
      <CardFront config={DUMMY_CONFIG} />
      <CardBack config={DUMMY_CONFIG} />
    </div>
  )
}
