import { useTranslation } from 'react-i18next'
import CharCountInput from '../../components/CharCountInput'

type ProfileField = 'name' | 'company' | 'title' | 'bio'

type Props = {
  name: string
  company: string
  title: string
  bio: string
  onChange: (field: ProfileField, value: string) => void
  nameError?: string
}

export default function ProfileFormSection({
  name,
  company,
  title,
  bio,
  onChange,
  nameError,
}: Props) {
  const { t } = useTranslation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CharCountInput
        id="profile-name"
        label={t('profile.name')}
        placeholder={t('profile.namePlaceholder')}
        value={name}
        onChange={(v) => onChange('name', v)}
        maxLength={30}
        multiline={false}
        error={nameError}
      />
      <CharCountInput
        label={t('profile.company')}
        placeholder={t('profile.companyPlaceholder')}
        value={company}
        onChange={(v) => onChange('company', v)}
        maxLength={40}
        multiline={false}
      />
      <CharCountInput
        label={t('profile.title')}
        placeholder={t('profile.titlePlaceholder')}
        value={title}
        onChange={(v) => onChange('title', v)}
        maxLength={40}
        multiline={false}
      />
      <CharCountInput
        label={t('profile.bio')}
        placeholder={t('profile.bioPlaceholder')}
        value={bio}
        onChange={(v) => onChange('bio', v)}
        maxLength={60}
        multiline={true}
      />
    </div>
  )
}
