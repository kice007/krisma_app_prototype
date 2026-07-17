import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Ellipsis } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'
import { IxTeacher } from '../components/TabIcons'

const BARS = [40, 50, 75, 100, 60, 45]
const MONTHS = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui']
const ACTIVE_BAR = 3 // Avr

function ArrowDownIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  )
}

function ArrowUpIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  )
}

const CATS = [
  { iconBg: '#FFF8E1', renderIcon: (c) => <ArrowDownIcon color={c} />, iconColor: '#0A0A0F', name: 'Requêtes', sub: 'Demandes reçues', amt: 'EUR 10 456.00' },
  { iconBg: '#FDE8EA', renderIcon: (c) => <ArrowUpIcon color={c} />, iconColor: '#0A0A0F', name: 'Envoies', sub: 'Transferts effectués', amt: 'EUR 1 234.00' },
  { iconBg: '#EDE9FE', renderIcon: (c) => <IxTeacher color={c} size={20} />, iconColor: '#0A0A0F', name: 'Scolarité', sub: 'Frais scolarité', amt: 'EUR 8 500.00' },
]

export default function AnalytiqueLight() {
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

      {/* SubHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 50, backgroundColor: '#F0F0F8',
          border: '1px solid #E5E5F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }} onClick={() => navigate('/dashboard-light')}>
          <ChevronLeft size={20} color="#0A0A0F" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#0A0A0F' }}>
          Analyse
        </span>
        <div style={{
          width: 36, height: 36, borderRadius: 18, backgroundColor: '#F0F0F8',
          border: '1px solid #E5E5F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Ellipsis size={18} color="#0A0A0F" strokeWidth={2} />
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0, bottom: 71,
        display: 'flex', flexDirection: 'column', gap: 20,
        padding: '16px 20px 32px',
        overflowY: 'auto',
      }}>

        {/* Period selector */}
        <div style={{
          display: 'flex', gap: 6, padding: 4,
          backgroundColor: '#F0F0F8', borderRadius: 12, height: 44

        }}>
          {['Hebdomadaire', 'Mensuel', 'Annuel'].map((label, i) => (
            <div key={label} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 10, cursor: 'pointer', padding: 10,
              backgroundColor: i === 1 ? '#FFFFFF' : 'transparent',
            }}>
              <span style={{
                fontFamily: 'Inter', fontSize: 13,
                fontWeight: i === 1 ? 600 : 400,
                color: i === 1 ? '#0A0A0F' : '#737373',
                whiteSpace: 'nowrap',
              }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Chart card — always purple */}
        <div style={{
          backgroundColor: '#4F46E5', borderRadius: 20, padding: 24,
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
            Total dépense
          </span>
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 28, fontWeight: 700, color: '#FFFFFF' }}>
            EUR 3 765.00
          </span>

          {/* Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
            {BARS.map((h, i) => (
              <div key={i} style={{
                flex: 1, height: h,
                borderRadius: '6px 6px 0 0',
                backgroundColor: i === ACTIVE_BAR ? 'rgba(255,255,255,0.87)' : '#7C75E5',
              }} />
            ))}
          </div>

          {/* Month labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {MONTHS.map(m => (
              <span key={m} style={{
                flex: 1, fontFamily: 'Inter', fontSize: 11,
                color: 'rgba(255,255,255,0.67)', textAlign: 'center',
              }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Categories heading */}
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#0A0A0F' }}>
          Catégories
        </span>

        {/* Category rows */}
        {CATS.map(({ iconBg, renderIcon, iconColor, name, sub, amt }) => (
          <div key={name} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderRadius: 14, padding: 16,
            backgroundColor: '#FFFFFF', border: '1px solid #E5E5F0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 24,
                backgroundColor: iconBg, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {renderIcon(iconColor)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 600, color: '#0A0A0F' }}>{name}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{sub}</span>
              </div>
            </div>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 600, color: '#0A0A0F' }}>
              {amt}
            </span>
          </div>
        ))}
      </div>

      <TabBar activeTab="Analytique" theme="light" />
    </motion.div>
  )
}
