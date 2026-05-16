import { TEMPLATE_SETS } from '../../constants/templateSets'
import type { CardConfig } from '../../types/card'

type Props = {
  config: CardConfig
}

export default function CardFront({ config }: Props) {
  const templateSet = TEMPLATE_SETS.find((t) => t.id === config.templateSetId) ?? TEMPLATE_SETS[0]

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 group border border-neutral-800">
      {/* Background Image with subtle overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-[2000ms] group-hover:scale-105"
        style={{ backgroundImage: `url(${templateSet.backgroundImage})` }}
      />
      
      {/* Dark sleek gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950/80 to-neutral-900/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center text-neutral-100">
        <div className="relative mb-5">
          <div className="absolute -inset-1 bg-gradient-to-r from-neutral-600 to-neutral-300 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
          <img
            src={templateSet.avatarFrame}
            alt="avatar"
            className="relative w-20 h-20 rounded-full object-cover border border-neutral-700 shadow-xl"
          />
        </div>

        {config.name && (
          <p className="m-0 text-2xl md:text-3xl font-light tracking-[0.15em] text-white">
            {config.name}
          </p>
        )}

        {config.company && (
          <p className="m-0 text-[11px] md:text-xs font-medium tracking-[0.2em] text-neutral-400 mt-2 uppercase">
            {config.company}
          </p>
        )}

        {config.title && (
          <p className="m-0 text-[10px] md:text-[11px] tracking-[0.2em] text-neutral-500 uppercase mt-1">
            {config.title}
          </p>
        )}

        {config.bio && (
          <p className="mt-5 text-[10px] md:text-xs font-light tracking-wider text-neutral-400 leading-relaxed max-w-[85%] border-t border-neutral-800 pt-5">
            {config.bio}
          </p>
        )}
      </div>
    </div>
  )
}
