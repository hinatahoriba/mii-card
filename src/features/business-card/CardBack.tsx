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
import { useTranslation } from 'react-i18next'
import { TEMPLATE_SETS } from '../../constants/templateSets'
import { SNS_CONFIG } from '../../constants/snsConfig'
import type { CardConfig, SnsPlatform } from '../../types/card'

type Props = {
  config: CardConfig
}

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
  const { t } = useTranslation()
  const templateSet = TEMPLATE_SETS.find((t) => t.id === config.templateSetId) ?? TEMPLATE_SETS[0]

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800 group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay transition-transform duration-[2000ms] group-hover:scale-105"
        style={{ backgroundImage: `url(${templateSet.backgroundImage})` }}
      />
      
      {/* Dark sleek gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 to-black/95" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6 overflow-y-auto gap-4 scrollbar-hide">
        {config.snsLinks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-neutral-500 text-sm font-light tracking-widest uppercase">
            {t('card.noSns')}
          </div>
        ) : (
          <div className="flex flex-col justify-center min-h-full gap-3 my-auto">
            {config.snsLinks.map(({ platform, url }) => {
              const Icon = PLATFORM_ICONS[platform]
              const href = resolveUrl(platform, url)

              return (
                <button
                  key={platform}
                  onClick={() => window.open(href, '_blank')}
                  className="group/btn flex items-center gap-4 w-full px-5 py-3 rounded-xl border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md text-neutral-300 hover:text-white hover:border-neutral-500 hover:bg-neutral-800/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-950/50"
                >
                  <Icon size={18} className="text-neutral-500 group-hover/btn:text-white transition-colors duration-300" />
                  <span className="text-[11px] font-medium tracking-[0.2em] uppercase">{PLATFORM_LABELS[platform]}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
