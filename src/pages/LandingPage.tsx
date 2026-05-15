import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useTemplateState } from '../hooks/useTemplateState'
import TemplateSetPicker from '../features/template-selector/TemplateSetPicker'
import ProfileFormSection from '../features/template-selector/ProfileFormSection'
import QrModal from '../features/qr-generator/QrModal'

export default function LandingPage() {
  const { t } = useTranslation()
  const { config, setTemplateSetId, setProfileField } = useTemplateState()
  const [isQrOpen, setIsQrOpen] = useState(false)

  const demoUrl = 'https://mii-card.example.com/card/demo'

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px' }}>
      <LanguageSwitcher />
      <h1>{t('lp.title')}</h1>
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
      <button
        onClick={() => setIsQrOpen(true)}
        style={{ marginTop: '24px', width: '100%', padding: '12px', cursor: 'pointer', fontSize: '16px' }}
      >
        {t('lp.generateButton')}
      </button>
      <QrModal url={demoUrl} isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  )
}
