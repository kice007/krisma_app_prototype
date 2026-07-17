// Iconsax SVG paths embedded directly — no package dependency.
// Each icon accepts: color (string), bold (bool), size (number).
// bold=true → Bold variant (filled), bold=false → Linear variant (stroke).

function Svg({ size, children }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </svg>
  )
}

export function IxHome({ color = 'currentColor', bold = false, size = 22 }) {
  if (bold) return (
    <Svg size={size}>
      <path fill={color} d="m20.04 6.822-5.76-4.03c-1.57-1.1-3.98-1.04-5.49.13l-5.01 3.91c-1 .78-1.79 2.38-1.79 3.64v6.9c0 2.55 2.07 4.63 4.62 4.63h10.78c2.55 0 4.62-2.07 4.62-4.62v-6.78c0-1.35-.87-3.01-1.97-3.78Zm-7.29 11.18c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3Z"/>
    </Svg>
  )
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="m9.02 2.84-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12ZM12 17.99v-3"/>
    </Svg>
  )
}

export function IxChart({ color = 'currentColor', bold = false, size = 22 }) {
  if (bold) return (
    <Svg size={size}>
      <path fill={color} d="M22 22H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h20c.41 0 .75.34.75.75s-.34.75-.75.75Z"/>
      <path fill={color} d="M9.75 4v18h4.5V4c0-1.1-.45-2-1.8-2h-.9c-1.35 0-1.8.9-1.8 2ZM3 10v12h4V10c0-1.1-.4-2-1.6-2h-.8C3.4 8 3 8.9 3 10ZM17 15v7h4v-7c0-1.1-.4-2-1.6-2h-.8c-1.2 0-1.6.9-1.6 2Z"/>
    </Svg>
  )
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M7 10.74v3.2M12 9v6.68M17 10.74v3.2M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"/>
    </Svg>
  )
}

export function IxCard({ color = 'currentColor', bold = false, size = 22 }) {
  if (bold) return (
    <Svg size={size}>
      <path fill={color} d="M22 7.548c0 .66-.54 1.2-1.2 1.2H3.2c-.66 0-1.2-.54-1.2-1.2v-.01c0-2.29 1.85-4.14 4.14-4.14h11.71c2.29 0 4.15 1.86 4.15 4.15ZM2 11.45v5.01c0 2.29 1.85 4.14 4.14 4.14h11.71c2.29 0 4.15-1.86 4.15-4.15v-5c0-.66-.54-1.2-1.2-1.2H3.2c-.66 0-1.2.54-1.2 1.2Zm6 5.8H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2c.41 0 .75.34.75.75s-.34.75-.75.75Zm6.5 0h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75Z"/>
    </Svg>
  )
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
        d="M2 8.505h20M6 16.505h2M10.5 16.505h4"/>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M6.44 3.505h11.11c3.56 0 4.45.88 4.45 4.39v8.21c0 3.51-.89 4.39-4.44 4.39H6.44c-3.55.01-4.44-.87-4.44-4.38v-8.22c0-3.51.89-4.39 4.44-4.39Z"/>
    </Svg>
  )
}

export function IxUser({ color = 'currentColor', bold = false, size = 22 }) {
  if (bold) return (
    <Svg size={size}>
      <path fill={color} d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z"/>
    </Svg>
  )
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"/>
    </Svg>
  )
}

// Iconsax Teacher (graduation cap) — used for Scolarité category icon
export function IxTeacher({ color = 'currentColor', bold = false, size = 22 }) {
  if (bold) return (
    <Svg size={size}>
      <path fill={color} d="M10.05 2.53L3.03 6.46c-1.51.96-1.51 3.12 0 4.08l7.02 3.93c1.08.63 2.82.63 3.9 0l7.02-3.93c1.51-.96 1.51-3.12 0-4.08L13.95 2.53C12.87 1.9 11.13 1.9 10.05 2.53Z"/>
      <path fill={color} opacity=".5" d="M5.63 13.08V17.9C5.63 20.23 8.52 21.5 12 21.5c3.48 0 6.37-1.27 6.37-3.6v-4.82L12 16.5l-6.37-3.42Z"/>
      <path fill={color} d="M20.75 6.75a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .75-.75Z"/>
    </Svg>
  )
  return (
    <Svg size={size}>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M10.05 2.53L3.03 6.46C1.52 7.42 1.52 8.57 3.03 9.53L10.05 13.46C11.13 14.09 12.87 14.09 13.95 13.46L20.97 9.53C22.48 8.57 22.48 7.43 20.97 6.46L13.95 2.53C12.87 1.9 11.13 1.9 10.05 2.53Z"/>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M5.63 13.08V17.9C5.63 20.23 8.52 21.5 12 21.5c3.48 0 6.37-1.27 6.37-3.6v-4.82"/>
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M21.5 7.5V12"/>
    </Svg>
  )
}
