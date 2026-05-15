import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import QrCodeDisplay from './QrCodeDisplay'

type Props = {
  url: string
  isOpen: boolean
  onClose: () => void
}

export default function QrModal({ url, isOpen, onClose }: Props) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              maxWidth: '360px',
              width: '90%',
            }}
          >
            <h2 style={{ margin: 0 }}>{t('qr.title')}</h2>
            <p style={{ margin: 0, textAlign: 'center', color: '#555' }}>
              {t('qr.description')}
            </p>
            <QrCodeDisplay url={url} />
            <button onClick={handleCopy} style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
              {copied ? t('qr.copied') : t('qr.copy')}
            </button>
            <button onClick={onClose} style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
              {t('qr.close')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
