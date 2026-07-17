import { Signal, Wifi, BatteryFull } from 'lucide-react'

export default function StatusBar({ color = '#FFFFFF' }) {
  return (
    <div
      className="absolute top-0 left-0 flex items-center justify-between w-full"
      style={{ height: 62, paddingLeft: 24, paddingRight: 24, zIndex: 10 }}
    >
      <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color }}>9:41</span>
      <div className="flex items-center" style={{ gap: 10 }}>
        <Signal size={16} color={color} strokeWidth={2} />
        <Wifi size={16} color={color} strokeWidth={2} />
        <BatteryFull size={22} color={color} strokeWidth={2} />
      </div>
    </div>
  )
}
