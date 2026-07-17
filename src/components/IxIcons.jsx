// Iconsax Linear SVG icons used in the Profil & Documents screens.
// strokeWidth 1.5, round caps/joins — matches the iconsax Linear style.

function Svg({ size, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  )
}

// iconsax setting-2 Linear
export function IxSetting({ color = '#fff', size = 22 }) {
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
        d="M2 12.88v-1.76a1.9 1.9 0 0 1 1.9-1.9c1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85a1.9 1.9 0 0 1 1.9 1.9v1.76a1.9 1.9 0 0 1-1.9 1.9c-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.9 1.9 0 0 1-.7-2.59c.91-1.57.17-2.85-1.64-2.85A1.9 1.9 0 0 1 2 12.88Z" />
    </Svg>
  )
}

// iconsax document-text Linear
export function IxDocument({ color = '#fff', size = 22 }) {
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M9 22h6c5 0 7-2 7-7V9L15 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M15 2v4c0 1.5.5 3 3 3h4" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round"
        d="M8 13h4M8 17h8" />
    </Svg>
  )
}

// iconsax receipt-item Linear (used for Parrainage invite row)
export function IxReceipt({ color = '#fff', size = 22 }) {
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M3.5 22V7c0-4 1-5 5-5h7c4 0 5 1 5 5v15l-2.5-1.86-2.5 1.86-2.5-1.86-2.5 1.86L8.5 20.14 6 22l-2.5-1.86Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round"
        d="M9.5 10h5M9.5 14h3.5" />
    </Svg>
  )
}

// iconsax global Linear (Langue setting)
export function IxGlobal({ color = '#fff', size = 22 }) {
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M8 3h1c-2.5 7.5-2.5 10.5 0 18H8M15 3c2.5 7.5 2.5 10.5 0 18" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M3 16v-1c7.5 2.5 10.5 2.5 18 0v1M3 9c7.5-2.5 10.5-2.5 18 0" />
    </Svg>
  )
}

// iconsax moon Linear (Apparence setting)
export function IxMoon({ color = '#fff', size = 22 }) {
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M2.03 12.42c.36 5.17 4.74 9.34 9.99 9.56 3.69.15 6.99-1.56 9.02-4.32.34-.47-.04-1.11-.61-.99-5.49 1.19-10.55-2.94-10.55-8.48 0-2.82 2.18-5.19 4.97-5.62.55-.08.82-.73.43-1.12A9.994 9.994 0 0 0 2.03 12.42Z" />
    </Svg>
  )
}

// iconsax export Linear (Partager share button)
export function IxShare({ color = '#fff', size = 22 }) {
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M9 22h6c5 0 7-2 7-7v-5c0-5-2-7-7-7H9C4 3 2 5 2 10v5c0 5 2 7 7 7Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M8.47 14.53 15.53 7.47M15.53 12.6V7.47H10.4" />
    </Svg>
  )
}

// iconsax copy Linear (Copier button)
export function IxCopy({ color = '#fff', size = 22 }) {
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M16 12.9v4.2c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M22 6.9v4.2c0 3.5-1.4 4.9-4.9 4.9H16v-3.1C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2h4.2C20.6 2 22 3.4 22 6.9Z" />
    </Svg>
  )
}

// iconsax tick-circle Linear (Compte vérifié badge)
export function IxTickCircle({ color = '#fff', size = 22 }) {
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="m7.75 12 2.83 2.83 5.67-5.66" />
    </Svg>
  )
}

// iconsax arrow-left Linear (back button)
export function IxArrowLeft({ color = '#fff', size = 22 }) {
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M9.57 5.93 3.5 12l6.07 6.07M20.5 12H3.67" />
    </Svg>
  )
}

// iconsax send-2 Linear (Virement tab icon)
export function IxSend({ color = '#fff', bold = false, size = 22 }) {
  if (bold) return (
    <Svg size={size}>
      <path fill={color} d="M20.27 2.39 3.71 7.24c-1.5.44-1.9 1.43-1.9 1.96s.4 1.52 1.9 1.96l6.16 1.71 1.71 6.16c.44 1.5 1.43 1.9 1.96 1.9s1.52-.4 1.96-1.9l4.85-16.56c.37-1.24.08-2.01-.41-2.41-.35-.28-.85-.4-1.67-.17Z" />
    </Svg>
  )
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M20.27 2.39 3.71 7.24c-1.5.44-1.9 1.43-1.9 1.96s.4 1.52 1.9 1.96l6.16 1.71 1.71 6.16c.44 1.5 1.43 1.9 1.96 1.9s1.52-.4 1.96-1.9l4.85-16.56c.37-1.24.08-2.01-.41-2.41-.35-.28-.85-.4-1.67-.17Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="m9.44 14.56 3.23-3.23" />
    </Svg>
  )
}
