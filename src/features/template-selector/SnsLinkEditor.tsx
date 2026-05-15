import { useTranslation } from 'react-i18next'
import {
  SiLine,
  SiInstagram,
  SiX,
  SiFacebook,
  SiTiktok,
  SiWhatsapp,
  SiGithub,
} from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { SNS_CONFIG } from '../../constants/snsConfig'
import type { SnsLink, SnsPlatform } from '../../types/card'

const PLATFORM_ICONS: Record<SnsPlatform, IconType> = {
  line: SiLine,
  instagram: SiInstagram,
  x: SiX,
  facebook: SiFacebook,
  tiktok: SiTiktok,
  linkedin: FaLinkedin,
  whatsapp: SiWhatsapp,
  github: SiGithub,
}

const PLATFORM_LABELS: Record<SnsPlatform, string> = {
  line: 'LINE',
  instagram: 'Instagram',
  x: 'X',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
  github: 'GitHub',
}

const PLATFORMS = Object.keys(SNS_CONFIG) as SnsPlatform[]

type Props = {
  snsLinks: SnsLink[]
  onToggle: (platform: SnsPlatform) => void
  onUpdateUrl: (platform: SnsPlatform, url: string) => void
}

export default function SnsLinkEditor({ snsLinks, onToggle, onUpdateUrl }: Props) {
  const { i18n } = useTranslation()
  const locale = i18n.language.startsWith('ja') ? 'ja' : 'en'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {PLATFORMS.map((platform) => {
        const config = SNS_CONFIG[platform]
        const Icon = PLATFORM_ICONS[platform]
        const link = snsLinks.find((l) => l.platform === platform)
        const isOn = link !== undefined

        return (
          <div
            key={platform}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <button
              onClick={() => onToggle(platform)}
              aria-label={`${PLATFORM_LABELS[platform]} ${isOn ? 'off' : 'on'}`}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isOn ? config.color : '#d1d5db',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background-color 0.2s',
              }}
            >
              <Icon size={20} />
            </button>

            <span
              style={{
                width: '90px',
                fontSize: '14px',
                fontWeight: 500,
                flexShrink: 0,
                color: isOn ? '#111827' : '#9ca3af',
                transition: 'color 0.2s',
              }}
            >
              {PLATFORM_LABELS[platform]}
            </span>

            {isOn && (
              <input
                type={config.inputType === 'id' ? 'text' : config.inputType}
                value={link.url}
                placeholder={config.placeholder[locale]}
                onChange={(e) => onUpdateUrl(platform, e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
