import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import StatusBar from '../components/StatusBar'

function ChevronLeft({ color = '#1A1A2E', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function MoneySendIcon({ color = '#22C55E', size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
      <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.5" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" d="M3 10h2M19 10h2M3 14h2M19 14h2" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M17 4l2-2 2 2M19 2v4" />
    </svg>
  )
}

const ROWS = [
  { label: 'Bénéficiaire', value: 'Ivan Ehouman', valueColor: '#1A1A2E' },
  { label: 'Montant', value: 'EUR 300', valueColor: '#1A1A2E' },
  { label: 'Équivalent', value: '196 500 FCFA', valueColor: '#1A1A2E' },
  { label: 'Méthode', value: 'Orange Money', valueColor: '#1A1A2E' },
  { label: 'Statut', value: 'Envoyé ✓', valueColor: '#22C55E' },
]

export default function ParentNotificationDetailLight() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#F7F8FC', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar color="#1A1A2E" />

      {/* Header — back only */}
      <div style={{
        position: 'absolute',
        top: 62,
        left: 0,
        right: 0,
        height: 50, display: 'flex', alignItems: 'center',
        padding: '8px 20px', flexShrink: 0,
      }}>
        <button
          onClick={() => navigate('/parent-notifications-light')}
          style={{
            width: 36, height: 36, borderRadius: 50, backgroundColor: '#EAEAF2',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronLeft />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', top: 124 }}>
        <div style={{
          padding: '20px 20px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        }}>
          {/* Big icon */}
          <div style={{
            width: 80, height: 80, borderRadius: 50,
            backgroundColor: 'rgba(34,197,94,0.094)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <MoneySendIcon color="#22C55E" size={36} />
          </div>

          {/* Recipient */}
          <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373', textAlign: 'center' }}>
            À Ivan Ehouman
          </span>

          {/* Amount */}
          <span style={{
            fontFamily: '"Rethink Sans", sans-serif', fontSize: 32, fontWeight: 800,
            color: '#1A1A2E', textAlign: 'center', marginTop: -4,
          }}>
            - EUR 300
          </span>

          {/* Badge */}
          <div style={{
            borderRadius: 8, backgroundColor: 'rgba(34,197,94,0.082)',
            border: '0.5px solid rgba(34,197,94,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 14px',
          }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#22C55E' }}>
              Argent envoyé
            </span>
          </div>

          {/* Detail card */}
          <div style={{
            width: '100%', borderRadius: 16,
            backgroundColor: '#FFFFFF', border: '1px solid #DDDDE8',
            padding: '16px 18px',
          }}>
            {ROWS.map(({ label, value, valueColor }, i) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0',
                borderTop: i === 0 ? 'none' : '0.5px solid #DDDDE8',
              }}>
                <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>{label}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: valueColor }}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 16 }} />
        </div>
      </div>

      {/* CTA pinned at bottom */}
      <div style={{ padding: '16px 20px 40px', flexShrink: 0 }}>
        <button style={{
          width: '100%', height: 52, borderRadius: 14,
          backgroundColor: '#4F46E5', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Download size={18} color="#FFFFFF" strokeWidth={1.5} />
          <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>
            Télécharger le reçu
          </span>
        </button>
      </div>
    </motion.div>
  )
}
