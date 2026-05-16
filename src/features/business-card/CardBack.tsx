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

const PLATFORM_COLORS: Record<SnsPlatform, string> = {
  line: '#06C755',
  instagram: '#E1306C',
  x: '#000000',
  facebook: '#1877F2',
  tiktok: '#000000',
  linkedin: '#0077B5',
  whatsapp: '#25D366',
  github: '#181717',
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

  return (
    <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl bg-white/80 backdrop-blur-xl border border-white/50 flex flex-col items-center justify-center p-8">
      {config.snsLinks.length === 0 ? (
        <div className="text-neutral-500 text-sm font-medium tracking-widest uppercase">
          {t('card.noSns')}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-black text-neutral-800 tracking-[0.2em] mb-12">
            FOLLOW ME!!
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 text-[40px]">
            {config.snsLinks.map(({ platform, url }) => {
              const Icon = PLATFORM_ICONS[platform]
              const href = resolveUrl(platform, url)
              const color = PLATFORM_COLORS[platform]

              return (
                <button
                  key={platform}
                  onClick={() => window.open(href, '_blank')}
                  className="transition-transform duration-300 hover:scale-125 hover:-translate-y-1 drop-shadow-md"
                  style={{ color }}
                >
                  <Icon />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
