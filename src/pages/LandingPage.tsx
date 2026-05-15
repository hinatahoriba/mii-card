import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <div>
      <LanguageSwitcher />
      <h1>{t('lp.title')}</h1>
      <p>{t('lp.subtitle')}</p>
    </div>
  )
}
