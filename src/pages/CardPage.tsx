import { useState } from 'react'
import CardLoadingAnimation from '../features/business-card/CardLoadingAnimation'
import CardFront from '../features/business-card/CardFront'
import type { CardConfig } from '../types/card'

const DUMMY_CONFIG: CardConfig = {
  templateSetId: 1,
  name: '山田 太郎',
  company: '株式会社サンプル',
  title: 'フロントエンドエンジニア',
  bio: 'ものづくりが好きです。',
  snsLinks: [],
  locale: 'ja',
}

export default function CardPage() {
  const [loading, setLoading] = useState(true)

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        padding: '16px',
      }}
    >
      {loading && (
        <CardLoadingAnimation onComplete={() => setLoading(false)} />
      )}
      <CardFront config={DUMMY_CONFIG} />
    </div>
  )
}
