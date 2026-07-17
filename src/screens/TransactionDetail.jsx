import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ArrowUp } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'

const ROWS = [
  { label: 'ID de transaction', value: '#8907654', valueColor: '#FFFFFF', divider: false },
  { label: 'Frais (1%)', value: 'EUR 1.06', valueColor: '#FFFFFF', divider: true },
  { label: 'Méthode', value: '•••• 7865', valueColor: '#FFFFFF', divider: true },
  { label: 'Statut', value: '● completé', valueColor: '#22C55E', divider: true },
  { label: 'Heure Date', value: '29 Mars, 16:15', valueColor: '#FFFFFF', divider: true },
]

export default function TransactionDetail() {
  const navigate = useNavigate()
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* DHdr — back only, 50px */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 50,
        display: 'flex', alignItems: 'center',
        padding: '8px 20px',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 50,
          backgroundColor: '#141830',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }} onClick={() => navigate('/transactions')}>
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{
        position: 'absolute', top: 112, left: 0, right: 0, bottom: 77,
        overflowY: 'auto', padding: '24px 20px 32px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
      }}>

        {/* Icon */}
        <div style={{
          width: 80, height: 80, borderRadius: 40,
          backgroundColor: '#fce8ea',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <ArrowUp size={32} color="#000000" strokeWidth={2} />
        </div>

        {/* Name */}
        <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373', textAlign: 'center' }}>
          Envoyé à Marc
        </span>

        {/* Amount */}
        <span style={{
          fontFamily: '"Rethink Sans", sans-serif', fontSize: 32, fontWeight: 800,
          color: '#FFFFFF', textAlign: 'center', marginTop: -8,
        }}>
          - EUR 160.00
        </span>

        {/* Badge */}
        <div style={{
          borderRadius: 5, backgroundColor: '#141830',
          border: '0.5px solid #1E1E2E',
          padding: '6px 14px',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#FFFFFF' }}>Transfert</span>
        </div>

        {/* Details Card */}
        <div style={{
          width: '100%', borderRadius: 20,
          backgroundColor: '#0D1025',
          padding: 20,
        }}>
          <span style={{
            fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700,
            color: '#FFFFFF', display: 'block', marginBottom: 4,
          }}>
            Details de transaction
          </span>

          {ROWS.map(({ label, value, valueColor, divider }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 0',
              borderTop: divider ? '1px solid #7373731a' : 'none',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>{label}</span>
              <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: valueColor }}>{value}</span>
            </div>
          ))}
        </div>

      </div>

      <TabBar activeTab="Accueil" theme="dark" />
    </motion.div>
  )
}
