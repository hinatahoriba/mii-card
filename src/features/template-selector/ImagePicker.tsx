import { useTranslation } from 'react-i18next'

type Item = {
  id: number
  src: string
  label: { ja: string; en: string }
}

type Props = {
  items: Item[]
  selectedId: number
  onSelect: (id: number) => void
  type: 'background' | 'avatar'
}

export default function ImagePicker({ items, selectedId, onSelect, type }: Props) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ja'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        overflowX: 'auto',
        padding: '8px 4px 16px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {items.map((item) => {
        const isSelected = item.id === selectedId
        
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              scrollSnapAlign: 'start',
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
                width: type === 'background' ? '100px' : '80px',
                height: type === 'background' ? '140px' : '80px',
                borderRadius: type === 'background' ? '12px' : '50%',
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
                src={item.src}
                alt=""
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
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
              {item.label[lang]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
