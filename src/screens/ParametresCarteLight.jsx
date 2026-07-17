import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Shield, Globe, MapPin, Wifi, Settings2, Info } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const ROWS = [
  { key: 'freeze', Icon: Shield,  label: 'Geler la carte',           sub: null,                        on: false },
  { key: 'online', Icon: Globe,   label: 'Paiements en ligne',        sub: 'Achats sur internet',       on: true  },
  { key: 'abroad', Icon: MapPin,  label: "Paiements à l'étranger",   sub: 'Hors zone Euro',             on: true  },
  { key: 'nfc',    Icon: Wifi,    label: 'Paiement sans contact',     sub: 'NFC · Apple / Google Pay',  on: true  },
]

function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        position: 'relative', width: 52, height: 28, borderRadius: 100,
        backgroundColor: on ? '#22C55E' : '#D1D1E0',
        flexShrink: 0, cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
    >
      <motion.div
        animate={{ x: on ? 26 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{
          position: 'absolute', top: 2, width: 24, height: 24,
          borderRadius: '50%', backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 4px rgba(0,0,0,0.13)',
        }}
      />
    </div>
  )
}

export default function ParametresCarteLight() {
  const navigate = useNavigate()
  const [toggles, setToggles] = useState(
    Object.fromEntries(ROWS.map(r => [r.key, r.on]))
  )
  const flip = key => setToggles(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#F7F8FC' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar color="#0A0A0F" />

      {/* SubHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 50,
          backgroundColor: '#F0F0F8', border: '1px solid #E5E5F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }} onClick={() => navigate('/carte-light')}>
          <ChevronLeft size={20} color="#0A0A0F" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#0A0A0F' }}>
          Paramètres Carte
        </span>
        <div style={{ width: 36, height: 36 }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', gap: 20,
        padding: '16px 20px 32px',
        overflowY: 'auto',
      }}>

        {/* ToggleCard */}
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E5E5F0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}>
          {ROWS.map(({ key, Icon, label, sub }, i) => {
            const resolvedSub = key === 'freeze'
              ? (toggles[key] ? 'Activé' : 'Désactivé')
              : sub
            const subColor = key === 'freeze' ? '#737373' : '#8080A0'

            return (
              <div key={key} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                height: 72, padding: '0 20px',
                borderBottom: i < ROWS.length - 1 ? '1px solid #E5E5F0' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 22, backgroundColor: '#4F46E5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={20} color="#FFFFFF" strokeWidth={1.5} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 600, color: '#0A0A0F' }}>{label}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 12, color: subColor }}>{resolvedSub}</span>
                  </div>
                </div>
                <Toggle on={toggles[key]} onToggle={() => flip(key)} />
              </div>
            )
          })}
        </div>

        {/* LimitCard */}
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E5E5F0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 72, padding: '0 20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 22, backgroundColor: '#C9972B',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Settings2 size={20} color="#FFFFFF" strokeWidth={1.5} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 600, color: '#0A0A0F' }}>Limite mensuelle</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Sur validation · 24–48h</span>
              </div>
            </div>
            <div onClick={() => navigate('/demande-limit-light')} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 13, fontWeight: 600, color: '#0A0A0F' }}>EUR 2 000</span>
              <ChevronRight size={16} color="#737373" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Note */}
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 12,
          border: '1px solid #E5E5F0',
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px',
        }}>
          <Info size={16} color="#4F46E5" strokeWidth={2} style={{ flexShrink: 0, alignSelf: 'flex-start', marginTop: 1 }} />
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373', lineHeight: 1.5 }}>
            Toggles actifs immédiatement. La limite mensuelle requiert une validation sous 24–48h.
          </span>
        </div>

      </div>
    </motion.div>
  )
}
