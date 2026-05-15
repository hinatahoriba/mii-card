import { TEMPLATE_SETS } from '../../constants/templateSets'
import type { CardConfig } from '../../types/card'

type Props = {
  config: CardConfig
}

export default function CardFront({ config }: Props) {
  const templateSet = TEMPLATE_SETS.find((t) => t.id === config.templateSetId) ?? TEMPLATE_SETS[0]

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
        backgroundImage: `url(${templateSet.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 半透明オーバーレイ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 32px',
          gap: '6px',
          textAlign: 'center',
          color: '#ffffff',
          boxSizing: 'border-box',
        }}
      >
        {/* アバターフレーム */}
        <img
          src={templateSet.avatarFrame}
          alt="avatar"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid rgba(255,255,255,0.8)',
            marginBottom: '8px',
            flexShrink: 0,
          }}
        />

        {config.name && (
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(16px, 4vw, 22px)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              lineHeight: 1.3,
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            {config.name}
          </p>
        )}

        {config.company && (
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(11px, 2.5vw, 13px)',
              fontWeight: 500,
              opacity: 0.9,
              letterSpacing: '0.06em',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            {config.company}
          </p>
        )}

        {config.title && (
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(10px, 2.2vw, 12px)',
              opacity: 0.8,
              letterSpacing: '0.05em',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            {config.title}
          </p>
        )}

        {config.bio && (
          <p
            style={{
              margin: '6px 0 0',
              fontSize: 'clamp(9px, 2vw, 11px)',
              fontStyle: 'italic',
              opacity: 0.75,
              lineHeight: 1.5,
              maxWidth: '90%',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            {config.bio}
          </p>
        )}
      </div>
    </div>
  )
}
