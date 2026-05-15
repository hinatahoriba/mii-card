export type TemplateSet = {
  id: number
  backgroundImage: string
  avatarFrame: string
  label: { ja: string; en: string }
}

export const TEMPLATE_SETS: TemplateSet[] = [
  {
    id: 1,
    backgroundImage: '/assets/backgrounds/bg1.avif',
    avatarFrame: '/assets/icons/set-01-icon.webp',
    label: { ja: 'シンプル', en: 'Simple' },
  },
  {
    id: 2,
    backgroundImage: '/assets/backgrounds/bg2.jpg',
    avatarFrame: '/assets/icons/set-02-icon.webp',
    label: { ja: 'モダン', en: 'Modern' },
  },
  {
    id: 3,
    backgroundImage: '/assets/backgrounds/bg3.avif',
    avatarFrame: '/assets/icons/set-03-icon.webp',
    label: { ja: 'ナチュラル', en: 'Natural' },
  },
  {
    id: 4,
    backgroundImage: '/assets/backgrounds/bg4.avif',
    avatarFrame: '/assets/icons/set-04-icon.webp',
    label: { ja: 'ビジネス', en: 'Business' },
  },
  {
    id: 5,
    backgroundImage: '/assets/backgrounds/bg5.avif',
    avatarFrame: '/assets/icons/set-05-icon.webp',
    label: { ja: 'クリエイティブ', en: 'Creative' },
  },
]
