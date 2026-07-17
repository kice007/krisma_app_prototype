import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Bell, Palette, Globe, MessageCircle, Settings2, CircleCheckBig, Users2 } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import ParentTabBar from '../components/ParentTabBar'
import ThemeToggle from '../components/ThemeToggle'

const SETTINGS_ROWS = [

  { Icon: Bell, label: 'Notifications', sub: 'Alertes de réception', route: null },
  { Icon: Palette, label: 'Apparence', sub: 'Choisir le thème', route: null },
  { Icon: Globe, label: 'Langue & devise', sub: 'Français · EUR → FCFA', route: null },
  { Icon: MessageCircle, label: 'Support WhatsApp', sub: 'Disponible 24h/7j', route: null },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function ParentProfilLight() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#f7f8fc', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar color="#1A1A2E" />

      {/* Page Header */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div
          onClick={() => navigate('/parent-dashboard-light')}
          style={{
            width: 40, height: 40, borderRadius: 50,
            backgroundColor: '#EAEAF2',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ChevronLeft size={20} color="#0A0A0F" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 20, fontWeight: 800, color: '#1A1A2E' }}>
          Mon profil
        </span>
        <div style={{
          width: 36, height: 36, borderRadius: 50,
          backgroundColor: '#EAEAF2',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Settings2 size={16} color="#1A1A2E" strokeWidth={1.5} />
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0, bottom: 0,
        overflowY: 'auto', overflowX: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
        padding: '24px 20px 93px',
      }}>

        {/* Avatar section */}
        <motion.div {...fadeUp(0)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          width: '100%',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 36,
            backgroundColor: '#4F46E5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>LK</span>
          </div>
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 20, fontWeight: 700, color: '#1A1A2E' }}>
            Lamine Koné
          </span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: 'rgba(34,197,94,0.094)', borderRadius: 20, padding: '4px 12px',
          }}>
            <CircleCheckBig size={14} color="#22C55E" strokeWidth={2} />
            <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 500, color: '#22C55E' }}>
              Compte vérifié
            </span>
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>
            +225 07 07 07 07
          </span>
        </motion.div>

        {/* Settings card */}
        <motion.div {...fadeUp(0.08)} style={{
          width: '100%',
          borderRadius: 14,
          border: '1px solid #DDDDE8',
          backgroundColor: '#FFFFFF',
        }}>
          {SETTINGS_ROWS.map(({ Icon, label, sub, route }, i) => (
            <div
              key={label}
              onClick={() => route && navigate(route)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 18px',
                cursor: route ? 'pointer' : 'default',
                borderBottom: i < SETTINGS_ROWS.length - 1 ? '1px solid #DDDDE8' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  backgroundColor: '#4f46e51a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={17} color="#818cf8" strokeWidth={1.5} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{label}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{sub}</span>
                </div>
              </div>
              {label === 'Apparence' ? (
                <ThemeToggle />
              ) : (
                <ChevronRight size={16} color="#555577" strokeWidth={1.5} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.span
          {...fadeUp(0.14)}
          style={{ fontFamily: 'Inter', fontSize: 14, color: '#EF4444', textAlign: 'center', cursor: 'pointer' }}
        >
          Se déconnecter
        </motion.span>

      </div>

      <ParentTabBar activeTab="Profil" theme="light" />
    </motion.div>
  )
}
