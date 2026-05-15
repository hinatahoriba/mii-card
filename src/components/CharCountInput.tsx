type Props = {
  id?: string
  value: string
  onChange: (value: string) => void
  maxLength: number
  label: string
  placeholder?: string
  multiline?: boolean
  error?: string
}

export default function CharCountInput({
  id,
  value,
  onChange,
  maxLength,
  label,
  placeholder,
  multiline = false,
  error,
}: Props) {
  const remaining = maxLength - value.length
  const isWarning = remaining <= 10

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    fontSize: '14px',
    border: `1px solid ${error ? '#e53935' : '#ccc'}`,
    borderRadius: '6px',
    boxSizing: 'border-box',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? '72px' : undefined,
    fontFamily: 'inherit',
    textAlign: 'left',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
      <label
        htmlFor={id}
        style={{ fontSize: '13px', fontWeight: 600, color: '#444' }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          style={inputStyle}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {error ? (
          <span style={{ fontSize: '12px', color: '#e53935', fontWeight: 600 }}>{error}</span>
        ) : (
          <span />
        )}
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
