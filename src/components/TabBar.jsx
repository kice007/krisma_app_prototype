import { useNavigate } from 'react-router-dom'
import { IxHome, IxChart, IxCard, IxUser } from './TabIcons'

const TABS = [
  { Icon: IxHome, label: 'Accueil', darkRoute: '/dashboard', lightRoute: '/dashboard-light' },
  { Icon: IxChart, label: 'Analytique', darkRoute: '/analytique', lightRoute: '/analytique-light' },
  { Icon: IxCard, label: 'Ma carte', darkRoute: '/carte', lightRoute: '/carte-light' },
  { Icon: IxUser, label: 'Profil', darkRoute: '/profil', lightRoute: '/profil-light' },
]

export default function TabBar({ activeTab = 'Accueil', theme = 'dark' }) {
  const navigate = useNavigate()
  const dark = theme === 'dark'

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: dark ? 77 : 71,
      backgroundColor: dark ? '#0A0A0F' : '#FFFFFF',
      boxShadow: dark ? '0 -8px 24px rgba(0,0,0,0.25)' : '0 -1px 0 #E5E5F0',
      display: 'flex', padding: '6px 4px',
    }}>
      {TABS.map(({ Icon, label, darkRoute, lightRoute }) => {
        const active = label === activeTab
        const color = active ? (dark ? '#FFFFFF' : '#4F46E5') : (dark ? '#4A4A6A' : '#A3A3AF')
        const route = dark ? darkRoute : lightRoute

        return (
          <div
            key={label}
            onClick={() => route && navigate(route)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
              cursor: route ? 'pointer' : 'default',
              padding: '4px 0',
            }}
          >
            <Icon size={22} color={color} />
            <span style={{
              fontFamily: 'Inter', fontSize: 9,
              fontWeight: active ? 600 : 400,
              color, textAlign: 'center',
              lineHeight: 1.2,
            }}>
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
