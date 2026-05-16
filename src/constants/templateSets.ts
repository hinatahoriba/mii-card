export type TemplateSet = {
  id: number
  backgroundImage: string
  avatarFrame: string
  label: { ja: string; en: string }
}

export const BACKGROUNDS = [
  { id: 1, src: '/assets/backgrounds/bg1.avif', label: { ja: 'シンプル', en: 'Simple' } },
  { id: 2, src: '/assets/backgrounds/bg2.jpg', label: { ja: 'モダン', en: 'Modern' } },
  { id: 3, src: '/assets/backgrounds/bg3.avif', label: { ja: 'ナチュラル', en: 'Natural' } },
  { id: 4, src: '/assets/backgrounds/bg4.avif', label: { ja: 'ビジネス', en: 'Business' } },
  { id: 5, src: '/assets/backgrounds/bg5.avif', label: { ja: 'クリエイティブ', en: 'Creative' } },
]

export const AVATARS = [
  { id: 1, src: '/assets/icons/icon1.png', label: { ja: 'シンプル', en: 'Simple' } },
  { id: 2, src: '/assets/icons/icon2.png', label: { ja: 'モダン', en: 'Modern' } },
  { id: 3, src: '/assets/icons/icon3.png', label: { ja: 'ナチュラル', en: 'Natural' } },
  { id: 4, src: '/assets/icons/icon4.png', label: { ja: 'ビジネス', en: 'Business' } },
  { id: 5, src: '/assets/icons/icon5.png', label: { ja: 'クリエイティブ', en: 'Creative' } },
]

export const TEMPLATE_SETS: TemplateSet[] = [
  {
    id: 1,
    backgroundImage: BACKGROUNDS[0].src,
    avatarFrame: AVATARS[0].src,
    label: BACKGROUNDS[0].label,
  },
  {
    id: 2,
    backgroundImage: BACKGROUNDS[1].src,
    avatarFrame: AVATARS[1].src,
    label: BACKGROUNDS[1].label,
  },
  {
    id: 3,
    backgroundImage: BACKGROUNDS[2].src,
    avatarFrame: AVATARS[2].src,
    label: BACKGROUNDS[2].label,
  },
  {
    id: 4,
    backgroundImage: BACKGROUNDS[3].src,
    avatarFrame: AVATARS[3].src,
    label: BACKGROUNDS[3].label,
  },
  {
    id: 5,
    backgroundImage: BACKGROUNDS[4].src,
    avatarFrame: AVATARS[4].src,
    label: BACKGROUNDS[4].label,
  },
]
