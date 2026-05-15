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
import { TEMPLATE_SETS } from '../../constants/templateSets'
import { SNS_CONFIG } from '../../constants/snsConfig'
import type { CardConfig, SnsPlatform } from '../../types/card'

type Props = {
  config: CardConfig
}

const CARD_WIDTH = 400
const CARD_HEIGHT = Math.round(CARD_WIDTH / 1.618)

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

function resolveUrl(platform: SnsPlatform, url: string): string {
  if (platform === 'line' && SNS_CONFIG[platform].inputType === 'id') {
    return `https://line.me/ti/p/~${url}`
  }
  if (platform === 'whatsapp' && SNS_CONFIG[platform].inputType === 'tel') {
    return `https://wa.me/${url}`
  }
  return url
}

export default function CardBack({ config }: Props) {
  const templateSet = TEMPLATE_SETS.find((t) => t.id === config.templateSetId) ?? TEMPLATE_SETS[0]

  return (
    <div
      style={{
        position: 'relative',
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        maxWidth: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
        backgroundImage: `url(${templateSet.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexShrink: 0,
      }}
    >
      {/* 半透明オーバーレイ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
        }}
      />

      {/* コンテンツ */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 24px',
          overflowY: 'auto',
          gap: '10px',
          boxSizing: 'border-box',
        }}
      >
        {config.snsLinks.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
            }}
          >
            SNSリンクが登録されていません
          </div>
        ) : (
          config.snsLinks.map(({ platform, url }) => {
            const Icon = PLATFORM_ICONS[platform]
            const href = resolveUrl(platform, url)

            return (
              <button
                key={platform}
                onClick={() => window.open(href, '_blank')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: SNS_CONFIG[platform].color,
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <Icon size={20} />
                {PLATFORM_LABELS[platform]}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
