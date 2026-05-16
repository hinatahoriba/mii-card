import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useTemplateState } from '../hooks/useTemplateState'
import ImagePicker from '../features/template-selector/ImagePicker'
import { BACKGROUNDS, AVATARS } from '../constants/templateSets'
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
  const { config, setTemplateSetId, setBackgroundId, setAvatarId, setProfileField, toggleSnsLink, updateSnsUrl, setAnimationType } = useTemplateState()
  const [isQrOpen, setIsQrOpen] = useState(false)
  const [cardUrl, setCardUrl] = useState('')
  const [nameError, setNameError] = useState('')

  const handleGenerate = () => {
    if (config.name.trim() === '') {
      setNameError(t('lp.nameRequired'))
      document.getElementById('profile-name')?.focus()
      return
    }
    setNameError('')
    setCardUrl(generateCardUrl(config))
    setIsQrOpen(true)
  }

  // Fallback to templateSetId if backgroundId is not set
  const currentBackgroundId = config.backgroundId || config.templateSetId || 1

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h1 style={{ margin: 0, fontSize: 'clamp(24px, 6vw, 40px)', letterSpacing: '-0.5px' }}>
          {t('lp.title')}
        </h1>
        <LanguageSwitcher />
      </div>
      <p style={{ marginBottom: '8px' }}>{t('lp.subtitle')}</p>

      <h2>背景画像</h2>
      <ImagePicker
        items={BACKGROUNDS}
        selectedId={currentBackgroundId}
        onSelect={setBackgroundId}
        type="background"
      />

      <h2>アバターアイコン（任意）</h2>
      <ImagePicker
        items={AVATARS}
        selectedId={config.avatarId}
        onSelect={setAvatarId}
        type="avatar"
        allowDeselect={true}
      />

      <h2>アニメーション設定</h2>
      <select 
        value={config.animationType || 'mystery'} 
        onChange={(e) => setAnimationType(e.target.value as any)}
        style={{ width: '100%', padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '24px' }}
      >
        <option value="mystery">ミステリー（激しく震えて飛び出す）</option>
        <option value="game">ゲーム（ポップインしてバウンド）</option>
        <option value="elegant">エレガント（ふわっとフェードイン）</option>
        <option value="simple">シンプル（スライドアップ）</option>
      </select>

      <h2>{t('lp.profileSection')}</h2>
      <ProfileFormSection
        name={config.name}
        company={config.company}
        title={config.title}
        bio={config.bio}
        onChange={(field, value) => {
          setProfileField(field, value)
          if (field === 'name' && value.trim() !== '') setNameError('')
        }}
        nameError={nameError}
      />

      <h2>{t('lp.snsSection')}</h2>
      <SnsLinkEditor
        snsLinks={config.snsLinks}
        onToggle={(platform) => toggleSnsLink(platform, '')}
        onUpdateUrl={updateSnsUrl}
      />

      <button
        onClick={handleGenerate}
        style={{
          marginTop: '24px',
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        {t('lp.generateButton')}
      </button>

      <QrModal url={cardUrl} isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  )
}
