import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

type Props = {
  onComplete: () => void
}

export default function CardLoadingAnimation({ onComplete }: Props) {
  const { t } = useTranslation()

  useEffect(() => {
    // 0.6s scale-in + 1s hold + 0.4s fade-out = 2.0s total
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2.0, times: [0, 0.8, 1], ease: 'easeInOut' }}
      className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md flex flex-col items-center justify-center z-[2000] gap-8"
    >
      {/* 名刺カード */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.95], y: [20, 0, 0, -10] }}
        transition={{
          duration: 2.0,
          times: [0, 0.3, 0.8, 1],
          ease: 'easeOut',
        }}
        className="w-[320px] h-[180px] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col items-start justify-center p-8 gap-3 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-neutral-800/10 to-neutral-700/5" />
        
        {/* 名刺の内容（ダミーライン） */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-32 h-3.5 bg-neutral-700 rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="w-24 h-2.5 bg-neutral-800 rounded-full"
        />
        <div className="mt-3 flex gap-2">
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="w-16 h-2 bg-neutral-800 rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="w-20 h-2 bg-neutral-800 rounded-full"
          />
        </div>
      </motion.div>

      {/* ローディングテキスト */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.0, times: [0, 0.3, 0.8, 1] }}
        className="text-neutral-500 text-xs tracking-[0.3em] font-medium uppercase m-0"
      >
        {t('card.loading')}
      </motion.p>
    </motion.div>
  )
}
