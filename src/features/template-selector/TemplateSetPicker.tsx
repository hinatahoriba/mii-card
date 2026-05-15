import { TEMPLATE_SETS } from '../../constants/templateSets'
import TemplateSetPreview from './TemplateSetPreview'

type Props = {
  selectedId: number
  onSelect: (id: number) => void
}

export default function TemplateSetPicker({ selectedId, onSelect }: Props) {
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
      {TEMPLATE_SETS.map((set) => (
        <div key={set.id} style={{ scrollSnapAlign: 'start' }}>
          <TemplateSetPreview
            set={set}
            isSelected={set.id === selectedId}
            onSelect={() => onSelect(set.id)}
          />
        </div>
      ))}
    </div>
  )
}
