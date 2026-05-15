import { useTranslation } from 'react-i18next'
import type { TEMPLATE_SETS } from '../../constants/templateSets'

type Props = {
  set: (typeof TEMPLATE_SETS)[number]
  isSelected: boolean
  onSelect: () => void
}

export default function TemplateSetPreview({ set, isSelected, onSelect }: Props) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ja'

  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        padding: '4px',
        cursor: 'pointer',
        flexShrink: 0,
        transform: isSelected ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.2s ease',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100px',
          height: '140px',
          borderRadius: '12px',
          overflow: 'hidden',
          outline: isSelected ? '3px solid #3b82f6' : '2px solid transparent',
          outlineOffset: '2px',
          boxShadow: isSelected
            ? '0 4px 16px rgba(59,130,246,0.4)'
            : '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'outline 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <img
          src={set.backgroundImage}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <img
          src={set.avatarFrame}
          alt=""
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '48px',
            height: '48px',
            objectFit: 'contain',
          }}
        />
      </div>
      <span
        style={{
          fontSize: '12px',
          fontWeight: isSelected ? 700 : 400,
          color: isSelected ? '#3b82f6' : '#555',
          transition: 'color 0.2s ease, font-weight 0.2s ease',
        }}
      >
        {set.label[lang]}
      </span>
    </button>
  )
}
