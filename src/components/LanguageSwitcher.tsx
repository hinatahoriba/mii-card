import { useTranslation } from 'react-i18next'
import type { Locale } from '../types/card'

const LOCALES: Locale[] = ['ja', 'en']

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language as Locale

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {LOCALES.map((locale) => (
        <button
          key={locale}
          onClick={() => i18n.changeLanguage(locale)}
          style={{
            padding: '4px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: current === locale ? 'bold' : 'normal',
            background: current === locale ? '#000' : 'transparent',
            color: current === locale ? '#fff' : '#000',
          }}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
