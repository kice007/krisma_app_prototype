import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ArrowUp } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'

const ROWS = [
  { label: 'ID de transaction', value: '#8907654',     valueColor: '#0A0A0F', divider: true  },
  { label: 'Frais (1%)',        value: 'EUR 1.06',     valueColor: '#0A0A0F', divider: true  },
  { label: 'Méthode',          value: '•••• 7865',    valueColor: '#0A0A0F', divider: true  },
  { label: 'Statut',           value: '● completé',   valueColor: '#22C55E', divider: true  },
  { label: 'Heure Date',       value: '10 Mai, 12:30', valueColor: '#0A0A0F', divider: true  },
]

export default function TransactionDetailLight() {
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

      {/* DHdr — back only, 50px */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 50,
        display: 'flex', alignItems: 'center',
        padding: '8px 20px',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 50,
          backgroundColor: '#F0F0F8', border: '1px solid #E5E5F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }} onClick={() => navigate('/transactions-light')}>
          <ChevronLeft size={20} color="#0A0A0F" strokeWidth={2} />
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{
        position: 'absolute', top: 112, left: 0, right: 0, bottom: 71,
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
          color: '#0A0A0F', textAlign: 'center', marginTop: -8,
        }}>
          - EUR 160.00
        </span>

        {/* Badge */}
        <div style={{
          borderRadius: 5, backgroundColor: '#F0F0F8',
          border: '0.5px solid #E5E5F0',
          padding: '6px 14px',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Transfert</span>
        </div>

        {/* Details Card */}
        <div style={{
          width: '100%', borderRadius: 20,
          backgroundColor: '#FFFFFF',
          border: '0.5px solid #E5E5F0',
          padding: 20,
        }}>
          <span style={{
            fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700,
            color: '#0A0A0F', display: 'block', marginBottom: 4,
          }}>
            Details de transaction
          </span>

          {ROWS.map(({ label, value, valueColor, divider }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 0',
              borderTop: divider ? '1px solid #E5E5F0' : 'none',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>{label}</span>
              <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: valueColor }}>{value}</span>
            </div>
          ))}
        </div>

      </div>

      <TabBar activeTab="Accueil" theme="light" />
    </motion.div>
  )
}
