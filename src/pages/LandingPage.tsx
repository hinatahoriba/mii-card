import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useTemplateState } from '../hooks/useTemplateState'
import TemplateSetPicker from '../features/template-selector/TemplateSetPicker'

export default function LandingPage() {
  const { t } = useTranslation()
  const { config, setTemplateSetId } = useTemplateState()

  return (
    <div>
      <LanguageSwitcher />
      <h1>{t('lp.title')}</h1>
      <p>{t('lp.subtitle')}</p>
      <TemplateSetPicker
        selectedId={config.templateSetId}
        onSelect={setTemplateSetId}
      />
    </div>
  )
}
