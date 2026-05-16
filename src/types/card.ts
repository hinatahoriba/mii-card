export type Locale = 'ja' | 'en'

export type AnimationType = 'game' | 'mystery' | 'elegant' | 'simple'

export type SnsPlatform =
  | 'line'
  | 'instagram'
  | 'x'
  | 'facebook'
  | 'tiktok'
  | 'linkedin'
  | 'whatsapp'
  | 'github'

export type SnsLink = {
  platform: SnsPlatform
  url: string
}

export type CardConfig = {
  templateSetId?: number
  avatarId?: number
  backgroundId?: number
  name: string
  company: string
  title: string
  bio: string
  snsLinks: SnsLink[]
  locale: Locale
  animationType?: AnimationType
}
