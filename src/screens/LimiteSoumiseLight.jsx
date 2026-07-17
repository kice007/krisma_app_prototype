import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CircleCheck, Timer, BellDot } from 'lucide-react'
import StatusBar from '../components/StatusBar'

function Rings() {
  return (
    <motion.div
      style={{ position: 'relative', width: 160, height: 160, flexShrink: 0 }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: [1, 1.07, 1], opacity: [1, 0.85, 1] }}
      transition={{ duration: 0.85, ease: 'easeInOut', times: [0, 0.45, 1] }}
    >
      {/* Outer ring */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        backgroundColor: '#4F46E514',
      }} />
      {/* Middle ring */}
      <div style={{
        position: 'absolute', top: 26, left: 26, width: 108, height: 108,
        borderRadius: '50%', backgroundColor: '#4F46E526',
      }} />
      {/* Icon circle */}
      <div style={{
        position: 'absolute', top: 50, left: 50, width: 60, height: 60,
        borderRadius: 30, backgroundColor: '#4F46E5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Timer size={26} color="#FFFFFF" strokeWidth={1.5} />
      </div>
    </motion.div>
  )
}

const STATUS_ROWS = [
  { Icon: CircleCheck, label: 'Demande reçue',       iconBg: '#4F46E518', iconColor: '#4F46E5' },
  { Icon: Timer,       label: "En cours d'examen",   iconBg: '#818cf81a', iconColor: '#818cf8' },
  { Icon: BellDot,     label: 'Réponse sous 24–48h', iconBg: '#818cf81a', iconColor: '#818cf8' },
]

export default function LimiteSoumiseLight() {
  const navigate = useNavigate()
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#F7F8FC' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar color="#0A0A0F" />

      {/* Content — starts right below StatusBar, no SubHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', gap: 24,
        padding: '0 20px 32px',
        overflowY: 'auto',
      }}>

        {/* Hero */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 14, padding: '16px 0 20px',
        }}>
          <Rings />

          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 26, fontWeight: 800, color: '#0A0A0F' }}>
            Demande envoyée !
          </span>

          {/* Amount badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            borderRadius: 100, backgroundColor: '#4F46E50D',
            border: '1px solid #4F46E520',
            padding: '10px 22px',
          }}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 22, fontWeight: 800, color: '#0A0A0F' }}>
              EUR 3 000
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>/ mois</span>
          </div>

          <span style={{
            fontFamily: 'Inter', fontSize: 14, color: '#737373',
            textAlign: 'center', lineHeight: 1.5,
          }}>
            Votre demande de modification est en cours d'examen par notre équipe.
          </span>
        </div>

        {/* Status Card */}
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E5E5F0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}>
          {STATUS_ROWS.map(({ Icon, label, iconBg, iconColor }, i) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              height: 60, padding: '0 20px',
              borderBottom: i < STATUS_ROWS.length - 1 ? '1px solid #E5E5F0' : 'none',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 20,
                backgroundColor: iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={18} color={iconColor} strokeWidth={1.5} />
              </div>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 600, color: '#0A0A0F' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }} onClick={() => navigate('/parametres-carte-light')}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
              Retour aux paramètres
            </span>
          </div>
          <div style={{
            height: 52, borderRadius: 16,
            border: '1px solid #E5E5F0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 500, color: '#0A0A0F' }}>
              Retour à l'accueil
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
