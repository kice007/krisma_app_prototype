import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Shield, Globe, MapPin, Wifi, Settings2, Info } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const ROWS = [
  { key: 'freeze', Icon: Shield,   label: 'Geler la carte',          sub: 'Bloquer temporairement',    on: false },
  { key: 'online', Icon: Globe,    label: 'Paiements en ligne',       sub: 'Achats sur internet',       on: true  },
  { key: 'abroad', Icon: MapPin,   label: "Paiements à l'étranger",  sub: 'Hors zone Euro',             on: true  },
  { key: 'nfc',    Icon: Wifi,     label: 'Paiement sans contact',    sub: 'NFC · Apple / Google Pay',  on: true  },
]

function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        position: 'relative', width: 52, height: 28, borderRadius: 100,
        backgroundColor: on ? '#22C55E' : '#3D3D60',
        flexShrink: 0, cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
    >
      <motion.div
        animate={{ x: on ? 26 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{
          position: 'absolute', top: 3, width: 22, height: 22,
          borderRadius: '50%', backgroundColor: '#FFFFFF',
        }}
      />
    </div>
  )
}

export default function ParametresCarte() {
  const navigate = useNavigate()
  const [toggles, setToggles] = useState(
    Object.fromEntries(ROWS.map(r => [r.key, r.on]))
  )
  const flip = key => setToggles(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* SubHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div onClick={() => navigate('/carte')} style={{
          width: 40, height: 40, borderRadius: 50, backgroundColor: '#141830',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
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
          backgroundColor: '#0D1025', borderRadius: 16,
          border: '1px solid #1E1E2E',
          boxShadow: '0 4px 20px rgba(0,0,0,0.33)',
        }}>
          {ROWS.map(({ key, Icon, label, sub }, i) => (
            <div key={key} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              height: 72, padding: '0 20px',
              borderBottom: i < ROWS.length - 1 ? '1px solid #1E1E2E' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 22, backgroundColor: '#4F46E5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={20} color="#FFFFFF" strokeWidth={1.5} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>{label}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#8080A0' }}>{sub}</span>
                </div>
              </div>
              <Toggle on={toggles[key]} onToggle={() => flip(key)} />
            </div>
          ))}
        </div>

        {/* LimitCard */}
        <div style={{
          backgroundColor: '#0D1025', borderRadius: 16,
          border: '1px solid #1E1E2E',
          boxShadow: '0 4px 20px rgba(0,0,0,0.33)',
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
                <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Limite mensuelle</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#8080A0' }}>Sur validation · 24–48h</span>
              </div>
            </div>
            <div onClick={() => navigate('/demande-limit')} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#8888A0' }}>EUR 2 000</span>
              <ChevronRight size={18} color="#555577" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Note */}
        <div style={{
          backgroundColor: '#0D1025', borderRadius: 12,
          border: '1px solid #2A2A4A',
          boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px',
        }}>
          <Info size={16} color="#4F46E5" strokeWidth={2} style={{ flexShrink: 0, alignSelf: 'flex-start', marginTop: 1 }} />
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#8888A0', lineHeight: 1.5 }}>
            Toggles actifs immédiatement. La limite mensuelle requiert une validation sous 24–48h.
          </span>
        </div>

      </div>
    </motion.div>
  )
}
