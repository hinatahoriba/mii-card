import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import CardFront from './CardFront'
import CardBack from './CardBack'
import type { CardConfig } from '../../types/card'

// 黄金比 (横:縦 = 1.618:1)
const CARD_ASPECT = 1.618

type Props = {
  config: CardConfig
}

export default function CardFlipContainer({ config }: Props) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center gap-8 w-full relative">
      <div
        className="w-full cursor-pointer group"
        style={{
          perspective: '1200px',
          aspectRatio: `${CARD_ASPECT} / 1`,
        }}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 表面 */}
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <CardFront config={config} />
          </div>

          {/* 裏面: rotateY(180deg) で裏向きに配置し、scaleX(-1) で文字の鏡反転を補正 */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) scaleX(-1)',
            }}
          >
            <CardBack config={config} />
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isFlipped ? 0 : 1, y: isFlipped ? 10 : 0 }}
        transition={{ duration: 0.5 }}
        className="m-0 text-[10px] uppercase tracking-[0.3em] text-neutral-600 select-none font-medium"
      >
        {t('card.flip')}
      </motion.p>
    </div>
  )
}
