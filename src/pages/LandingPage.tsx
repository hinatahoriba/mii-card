import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useTemplateState } from '../hooks/useTemplateState'
import TemplateSetPicker from '../features/template-selector/TemplateSetPicker'
import ProfileFormSection from '../features/template-selector/ProfileFormSection'
import SnsLinkEditor from '../features/template-selector/SnsLinkEditor'
import QrModal from '../features/qr-generator/QrModal'
import { encodeCardConfig } from '../utils/encodeParams'

function generateCardUrl(config: Parameters<typeof encodeCardConfig>[0]): string {
  const encoded = encodeCardConfig(config)
  return `${window.location.origin}/card/${encoded}`
}

export default function LandingPage() {
  const { t } = useTranslation()
  const { config, setTemplateSetId, setProfileField, toggleSnsLink, updateSnsUrl } = useTemplateState()
  const [isQrOpen, setIsQrOpen] = useState(false)
  const [cardUrl, setCardUrl] = useState('')

  const handleGenerate = () => {
    setCardUrl(generateCardUrl(config))
    setIsQrOpen(true)
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h1 style={{ margin: 0 }}>{t('lp.title')}</h1>
        <LanguageSwitcher />
      </div>
      <p>{t('lp.subtitle')}</p>

      <h2>{t('lp.templateSection')}</h2>
      <TemplateSetPicker
        selectedId={config.templateSetId}
        onSelect={setTemplateSetId}
      />

      <h2>{t('lp.profileSection')}</h2>
      <ProfileFormSection
        name={config.name}
        company={config.company}
        title={config.title}
        bio={config.bio}
        onChange={setProfileField}
      />

      <h2>{t('lp.snsSection')}</h2>
      <SnsLinkEditor
        snsLinks={config.snsLinks}
        onToggle={(platform) => toggleSnsLink(platform, '')}
        onUpdateUrl={updateSnsUrl}
      />

      <button
        onClick={handleGenerate}
        disabled={config.name.trim() === ''}
        style={{
          marginTop: '24px',
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          cursor: config.name.trim() === '' ? 'not-allowed' : 'pointer',
          opacity: config.name.trim() === '' ? 0.5 : 1,
        }}
      >
        {t('lp.generateButton')}
      </button>

      <QrModal url={cardUrl} isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  )
}
