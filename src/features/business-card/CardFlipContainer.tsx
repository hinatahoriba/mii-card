import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import CardFront from './CardFront'
import CardBack from './CardBack'
import type { CardConfig } from '../../types/card'

const CARD_WIDTH = 400
const CARD_HEIGHT = Math.round(CARD_WIDTH / 1.618)

type Props = {
  config: CardConfig
}

export default function CardFlipContainer({ config }: Props) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { t } = useTranslation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div
        style={{
          perspective: '1000px',
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
          maxWidth: '100%',
          cursor: 'pointer',
          flexShrink: 0,
        }}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 表面 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <CardFront config={config} />
          </div>

          {/* 裏面: rotateY(180deg) で裏向きに配置し、scaleX(-1) で文字の鏡反転を補正 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) scaleX(-1)',
            }}
          >
            <CardBack config={config} />
          </div>
        </motion.div>
      </div>

      {!isFlipped && (
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            color: 'rgba(0, 0, 0, 0.45)',
            letterSpacing: '0.04em',
            userSelect: 'none',
          }}
        >
          {t('card.flip')}
        </p>
      )}
    </div>
  )
}
