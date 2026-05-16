import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowsRotate } from 'react-icons/fa6'
import CardFront from './CardFront'
import CardBack from './CardBack'
import type { CardConfig } from '../../types/card'

const ANIMATION_VARIANTS: Record<string, { initial: any, animate: any, transition: any }> = {
  game: {
    initial: { y: 800, opacity: 0, scale: 0.5 },
    animate: {
      y: [800, -20, 80, 80, 80, 80, 80, -15, 0],
      x: [0, 0, 0, -8, 8, -8, 8, 0, 0],
      rotateZ: [0, 0, 0, -3, 3, -3, 3, 0, 0],
      scale: [0.5, 1.05, 0.95, 0.95, 0.95, 0.95, 0.95, 1.02, 1],
      opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    transition: { 
      duration: 2.0,
      times: [0, 0.15, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 1],
      ease: "easeInOut" 
    }
  },
  mystery: {
    initial: { y: 480, opacity: 1, scale: 1 },
    animate: {
      y: [480, 480, 480, 480, 480, 540, 540, -20, 0],
      x: [0, -30, 30, -30, 0, 0, 0, 0, 0],
      scale: [1, 1, 1, 1, 1, 0.95, 0.95, 1.05, 1],
      opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    transition: {
      duration: 2.2,
      times: [0, 0.05, 0.1, 0.15, 0.2, 0.4, 0.75, 0.9, 1],
      ease: ["linear", "linear", "linear", "linear", "easeOut", "linear", "circIn", "easeOut"]
    }
  },
  elegant: {
    initial: { y: 100, opacity: 0, scale: 0.9, rotateZ: -5 },
    animate: { y: 0, opacity: 1, scale: 1, rotateZ: 0 },
    transition: { duration: 1.5, ease: "easeOut" }
  },
  simple: {
    initial: { y: 800, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 15 }
  }
}

type Props = {
  config: CardConfig
}

export default function CardFlipContainer({ config }: Props) {
  const [isFlipped, setIsFlipped] = useState(false)
  
  const type = config.animationType || 'mystery'
  const variant = ANIMATION_VARIANTS[type] || ANIMATION_VARIANTS.mystery
  const delayForButton = variant.transition.duration || 1.5

  return (
    <div className="flex flex-col items-center gap-8 w-full relative">
      <motion.div
        className="relative"
        initial={variant.initial}
        animate={variant.animate}
        transition={variant.transition}
      >
        <div
          className="group"
          style={{
            perspective: '2000px',
            width: '320px',
            height: '560px',
            maxWidth: '100vw'
          }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            className="w-full h-full relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 表面 */}
            <div
              className={`absolute inset-0 ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <CardFront config={config} />
            </div>

            {/* 裏面: rotateY(180deg) で裏向きに配置 */}
            <div
              className={`absolute inset-0 ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <CardBack config={config} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* フリップボタン */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delayForButton }}
        onClick={() => setIsFlipped((prev) => !prev)}
        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-2xl shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-white/30 transition-all duration-300 group"
      >
        <motion.div
          animate={{ rotate: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-white group-hover:text-white"
        >
          <FaArrowsRotate />
        </motion.div>
      </motion.button>
    </div>
  )
}
