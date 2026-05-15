import { useState } from 'react'
import CardLoadingAnimation from '../features/business-card/CardLoadingAnimation'

export default function CardPage() {
  const [loading, setLoading] = useState(true)

  return (
    <div>
      {loading && (
        <CardLoadingAnimation onComplete={() => setLoading(false)} />
      )}
      <div>Card</div>
    </div>
  )
}
