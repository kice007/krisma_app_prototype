import { useTheme } from '../theme'

// Pill switch that flips the whole app between dark and light.
// ON (knob right, indigo) = light mode.
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const on = theme === 'light'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Basculer le thème clair/sombre"
      onClick={(e) => {
        e.stopPropagation()
        toggle()
      }}
      style={{
        position: 'relative',
        width: 46,
        height: 26,
        borderRadius: 13,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        flexShrink: 0,
        backgroundColor: on ? '#4F46E5' : '#3A3A5A',
        transition: 'background-color 0.25s ease',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: on ? 23 : 3,
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          transition: 'left 0.25s ease',
        }}
      />
    </button>
  )
}
