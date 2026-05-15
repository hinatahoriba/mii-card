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
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        gap: '24px',
      }}
    >
      {/* 名刺カード */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 1] }}
        transition={{
          duration: 2.0,
          times: [0, 0.3, 0.8, 1],
          ease: 'easeOut',
        }}
        style={{
          width: '320px',
          height: '180px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '28px 32px',
          gap: '8px',
        }}
      >
        {/* 名刺の内容（ダミーライン） */}
        <div
          style={{
            width: '140px',
            height: '14px',
            backgroundColor: '#1a1a2e',
            borderRadius: '4px',
          }}
        />
        <div
          style={{
            width: '100px',
            height: '10px',
            backgroundColor: '#9ca3af',
            borderRadius: '4px',
          }}
        />
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <div
            style={{
              width: '60px',
              height: '8px',
              backgroundColor: '#d1d5db',
              borderRadius: '4px',
            }}
          />
          <div
            style={{
              width: '80px',
              height: '8px',
              backgroundColor: '#d1d5db',
              borderRadius: '4px',
            }}
          />
        </div>
      </motion.div>

      {/* ローディングテキスト */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.0, times: [0, 0.3, 0.8, 1] }}
        style={{
          color: '#ffffff',
          fontSize: '14px',
          margin: 0,
          letterSpacing: '0.05em',
        }}
      >
        {t('card.loading')}
      </motion.p>
    </motion.div>
  )
}
