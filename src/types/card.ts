export type Locale = 'ja' | 'en'

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
  templateSetId: number
  name: string
  company: string
  title: string
  bio: string
  snsLinks: SnsLink[]
  locale: Locale
}
