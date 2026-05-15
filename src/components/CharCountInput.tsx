type Props = {
  value: string
  onChange: (value: string) => void
  maxLength: number
  label: string
  placeholder?: string
  multiline?: boolean
}

export default function CharCountInput({
  value,
  onChange,
  maxLength,
  label,
  placeholder,
  multiline = false,
}: Props) {
  const remaining = maxLength - value.length
  const isWarning = remaining <= 10

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? '72px' : undefined,
    fontFamily: 'inherit',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '13px', fontWeight: 600, color: '#444' }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          style={inputStyle}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span
          style={{
            fontSize: '12px',
            color: isWarning ? '#e53935' : '#999',
            fontWeight: isWarning ? 600 : 400,
          }}
        >
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  )
}
