import { TEMPLATE_SETS } from '../../constants/templateSets'
import type { CardConfig } from '../../types/card'

type Props = {
  config: CardConfig
}

// 横:縦 = 1.618:1（黄金比）
const CARD_WIDTH = 400
const CARD_HEIGHT = Math.round(CARD_WIDTH / 1.618)

export default function CardFront({ config }: Props) {
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
        }}
      >
        {/* アバターフレーム */}
        <img
          src={templateSet.avatarFrame}
          alt="avatar"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid rgba(255,255,255,0.8)',
            marginBottom: '8px',
          }}
        />

        {/* 名前 */}
        {config.name && (
          <p
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              lineHeight: 1.3,
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            {config.name}
          </p>
        )}

        {/* 会社名 */}
        {config.company && (
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              fontWeight: 500,
              opacity: 0.9,
              letterSpacing: '0.06em',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            {config.company}
          </p>
        )}

        {/* 肩書き */}
        {config.title && (
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              opacity: 0.8,
              letterSpacing: '0.05em',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            {config.title}
          </p>
        )}

        {/* 一言 */}
        {config.bio && (
          <p
            style={{
              margin: '6px 0 0',
              fontSize: '11px',
              fontStyle: 'italic',
              opacity: 0.75,
              lineHeight: 1.5,
              maxWidth: '280px',
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
