import { AVATARS } from '../../constants/templateSets'
import type { CardConfig } from '../../types/card'

type Props = {
  config: CardConfig
}

export default function CardFront({ config }: Props) {
  // Support backward compatibility
  const avId = config.avatarId !== undefined ? config.avatarId : config.templateSetId
  const avatar = avId !== undefined ? AVATARS.find((a) => a.id === avId) : undefined

  return (
    <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl bg-white">
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center text-neutral-900">
        {avatar && (
          <div className="relative mb-8">
            <img
              src={avatar.src}
              alt="avatar"
              className="relative w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>
        )}

        {config.name && (
          <p className="m-0 text-3xl font-bold tracking-[0.15em] text-neutral-800">
            {config.name}
          </p>
        )}

        {config.company && (
          <p className="m-0 text-sm font-semibold tracking-[0.2em] text-neutral-400 mt-4 uppercase">
            {config.company}
          </p>
        )}

        {config.title && (
          <p className="m-0 text-xs tracking-[0.2em] text-neutral-500 uppercase mt-1">
            {config.title}
          </p>
        )}

        {config.bio && (
          <p className="mt-8 text-xs font-medium tracking-wider text-neutral-600 leading-relaxed max-w-[90%] border-t border-neutral-200 pt-6">
            {config.bio}
          </p>
        )}
      </div>
    </div>
  )
}
