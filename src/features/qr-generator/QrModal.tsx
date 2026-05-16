import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import QrCodeDisplay from './QrCodeDisplay'

type Props = {
  url: string
  isOpen: boolean
  onClose: () => void
}

function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
  }
  // HTTP環境などでClipboard APIが使えない場合のフォールバック
  return new Promise((resolve, reject) => {
    const el = document.createElement('textarea')
    el.value = text
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.focus()
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    ok ? resolve() : reject(new Error('execCommand failed'))
  })
}

export default function QrModal({ url, isOpen, onClose }: Props) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await copyToClipboard(url)
    } catch {
      // コピー失敗時は何もしない
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = 'qrcode.png'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
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
            padding: '16px',
          }}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '12px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              maxWidth: '360px',
              width: '100%',
            }}
          >
            <h2 style={{ margin: 0, color: '#000' }}>{t('qr.title')}</h2>
            <p style={{ margin: 0, textAlign: 'center', color: '#555' }}>
              {t('qr.description')}
            </p>
            <QrCodeDisplay url={url} />
            <button onClick={handleDownload} style={{ width: '100%', padding: '12px', cursor: 'pointer', backgroundColor: '#f1f1f1', border: '1px solid #ccc', borderRadius: '8px', color: '#000', fontWeight: 'bold' }}>
              {t('qr.download')}
            </button>
            <button onClick={handleCopy} style={{ width: '100%', padding: '12px', cursor: 'pointer', backgroundColor: '#f1f1f1', border: '1px solid #ccc', borderRadius: '8px', color: '#000', fontWeight: 'bold' }}>
              {copied ? t('qr.copied') : t('qr.copy')}
            </button>
            <button onClick={onClose} style={{ width: '100%', padding: '12px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
              {t('qr.close')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
