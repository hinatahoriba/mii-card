import type { SnsPlatform } from '../types/card'

export type SnsConfig = {
  color: string
  inputType: 'url' | 'id' | 'tel'
  placeholder: { ja: string; en: string }
}

export const SNS_CONFIG: Record<SnsPlatform, SnsConfig> = {
  line: {
    color: '#06C755',
    inputType: 'id',
    placeholder: { ja: 'LINE ID', en: 'LINE ID' },
  },
  instagram: {
    color: '#E1306C',
    inputType: 'url',
    placeholder: { ja: 'プロフィールURL', en: 'Profile URL' },
  },
  x: {
    color: '#000000',
    inputType: 'url',
    placeholder: { ja: 'プロフィールURL', en: 'Profile URL' },
  },
  facebook: {
    color: '#1877F2',
    inputType: 'url',
    placeholder: { ja: 'プロフィールURL', en: 'Profile URL' },
  },
  tiktok: {
    color: '#010101',
    inputType: 'url',
    placeholder: { ja: 'プロフィールURL', en: 'Profile URL' },
  },
  linkedin: {
    color: '#0A66C2',
    inputType: 'url',
    placeholder: { ja: 'プロフィールURL', en: 'Profile URL' },
  },
  whatsapp: {
    color: '#25D366',
    inputType: 'tel',
    placeholder: { ja: '電話番号（国番号付き）', en: 'Phone (with country code)' },
  },
  github: {
    color: '#181717',
    inputType: 'url',
    placeholder: { ja: 'プロフィールURL', en: 'Profile URL' },
  },
}
