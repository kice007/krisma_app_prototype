import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Banknote } from 'lucide-react'
import StatusBar from '../components/StatusBar'

function ChevronLeft({ color = '#0A0A0F', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  )
}

const ROWS = [
  { label: 'Expéditeur', value: 'Papa', valueColor: '#0A0A0F' },
  { label: 'Taux de change', value: '1 EUR = 655 FCFA', valueColor: '#0A0A0F' },
  { label: 'Montant en FCFA', value: '≈ 196 500 FCFA', valueColor: '#22C55E' },
  { label: 'Date', value: "Aujourd'hui · 09:34", valueColor: '#0A0A0F' },
  { label: 'Statut', value: '● Complété', valueColor: '#22C55E' },
]

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function NotificationDetailLight() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#F7F8FC' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar color="#0A0A0F" />

      {/* SubHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center',
        padding: '0 20px', zIndex: 9,
      }}>
        <button
          onClick={() => navigate('/notifications-light')}
          style={{
            width: 40, height: 40, borderRadius: 50, backgroundColor: '#F0F0F8',
            border: '1px solid #E5E5F0', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronLeft />
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={{
        position: 'absolute', top: 112, left: 0, right: 0, bottom: 0,
        overflowY: 'auto', padding: '32px 20px 56px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
      }}>

        {/* Icon */}
        <div style={{
          width: 50, height: 50, borderRadius: 50,
          backgroundColor: 'rgba(34,197,94,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Banknote size={28} color="#22C55E" strokeWidth={1.5} />
        </div>

        {/* Sub-label */}
        <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>
          Reçu de Papa
        </span>

        {/* Amount */}
        <span style={{
          fontFamily: '"Rethink Sans", sans-serif', fontSize: 36, fontWeight: 800,
          color: '#22C55E', marginTop: -4,
        }}>
          +EUR 300,00
        </span>

        {/* Status badge */}
        <div style={{
          borderRadius: 10, backgroundColor: 'rgba(34,197,94,0.1)',
          border: '0.5px solid rgba(34,197,94,0.3)',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#22C55E' }}>
            Argent reçu
          </span>
        </div>

        {/* Detail Card */}
        <div style={{
          width: '100%', borderRadius: 20,
          backgroundColor: '#FFFFFF', border: '0.5px solid #E5E5F0',
          padding: '20px', marginTop: 8,
        }}>
          <span style={{
            fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700,
            color: '#0A0A0F', display: 'block', marginBottom: 4,
          }}>
            Détails du virement
          </span>

          {ROWS.map(({ label, value, valueColor }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 0',
              borderTop: '0.5px solid #E5E5F0',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>{label}</span>
              <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: valueColor }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Indigo CTA */}
        <button style={{
          width: '100%', height: 100, borderRadius: 14,
          backgroundColor: '#4F46E5', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginTop: 4,
        }}>
          <WhatsAppIcon size={24} />
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>
            Remercier Papa
          </span>
        </button>

        {/* "Voir mon solde" link */}
        <button
          onClick={() => navigate('/dashboard-light')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 4 }}
        >
          <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#4F46E5' }}>Voir mon solde</span>
        </button>
      </div>
    </motion.div>
  )
}
