import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  onComplete: () => void
}

export default function CardLoadingAnimation({ onComplete }: Props) {
  const [showIntro, setShowIntro] = useState(true)
  const message = 'Nice to meet you'

  useEffect(() => {
    const textOutTimer = setTimeout(() => setShowIntro(false), 2000)
    const completeTimer = setTimeout(onComplete, 2600)
    
    return () => {
      clearTimeout(textOutTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.5, ease: 'easeIn' }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2.6, times: [0, 0.8, 1], ease: 'easeInOut' }}
      className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-[2000]"
    >
      <AnimatePresence>
        {showIntro && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="text-white text-2xl sm:text-4xl font-bold tracking-[0.2em] select-none"
          >
            {message.split('').map((char, i) => (
              <motion.span key={i} variants={item} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
