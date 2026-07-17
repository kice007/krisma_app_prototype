import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, SlidersHorizontal, X } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'
import avatarMarc from '../assets/avatar-marc.png'
import avatarSmith from '../assets/avatar-smith.png'

const FILTERS = ['Ce mois', '< 100€', 'Envoi']

const TRANSACTIONS = [
  { id: 'marc',   name: 'Envoyé à Marc',   date: '1 Juil, 10:30',   amount: '−EUR 90,00',  avatarSrc: avatarMarc },
  { id: 'smith',  name: 'Envoyé à Smith',  date: '28 Juin, 14:15',  amount: '−EUR 45,00',  avatarSrc: avatarSmith },
  { id: 'sophie', name: 'Envoyé à Sophie', date: '25 Juin, 09:00',  amount: '−EUR 78,50',  initials: 'S', bg: '#EDE9FE', color: '#818CF8' },
  { id: 'alexis', name: 'Envoyé à Alexis', date: '20 Juin, 16:45',  amount: '−EUR 32,00',  initials: 'A', bg: '#FFF8E1', color: '#D97706' },
  { id: 'laura',  name: 'Envoyé à Laura',  date: '15 Juin, 11:20',  amount: '−EUR 99,00',  initials: 'L', bg: '#FDE8EA', color: '#EF4444' },
  { id: 'thomas', name: 'Envoyé à Thomas', date: '10 Juin, 08:30',  amount: '−EUR 67,00',  initials: 'T', bg: '#E0F2FE', color: '#0EA5E9' },
  { id: 'emma',   name: 'Envoyé à Emma',   date: '5 Juin, 19:00',   amount: '−EUR 75,00',  initials: 'E', bg: '#DCFCE7', color: '#22C55E' },
]

function Avatar({ tx, size = 46 }) {
  if (tx.avatarSrc) {
    return (
      <div style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', flexShrink: 0 }}>
        <img src={tx.avatarSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: tx.bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 700, color: tx.color }}>
        {tx.initials}
      </span>
    </div>
  )
}

function FilterChip({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      height: 32, borderRadius: 16,
      backgroundColor: 'rgba(79,70,229,0.08)',
      border: '1px solid #818CF8',
      padding: '0 8px 0 12px',
      flexShrink: 0,
    }}>
      <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#4F46E5', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{
        width: 18, height: 18, borderRadius: 9,
        backgroundColor: 'rgba(79,70,229,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <X size={10} color="#4F46E5" strokeWidth={2.5} />
      </div>
    </div>
  )
}

function TxRow({ tx }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderRadius: 14, border: '0.5px solid #E5E5F0',
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Avatar tx={tx} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#0A0A0F' }}>{tx.name}</span>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{tx.date}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: '#0A0A0F' }}>
          {tx.amount}
        </span>
        <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#737373' }}>Transfert</span>
      </div>
    </div>
  )
}

export default function TransactionsFilteredLight() {
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
        <div
          onClick={() => navigate(-1)}
          style={{
            width: 40, height: 40, borderRadius: 50,
            backgroundColor: '#F0F0F8', border: '1px solid #E5E5F0',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ChevronLeft size={20} color="#0A0A0F" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#0A0A0F' }}>
          Transactions
        </span>
        <div
          onClick={() => navigate(-1)}
          style={{
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: '#4F46E5',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={1.75} />
        </div>
      </div>

      {/* Active filter chips */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0,
        padding: '12px 20px',
        display: 'flex', gap: 8, overflowX: 'auto',
      }}>
        {FILTERS.map(f => <FilterChip key={f} label={f} />)}
      </div>

      {/* Results summary */}
      <div style={{
        position: 'absolute', top: 174, left: 0, right: 0,
        padding: '8px 20px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#9898B8' }}>7 résultats</span>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 13, fontWeight: 700, color: '#0A0A0F' }}>
          −486,50€
        </span>
      </div>

      {/* Scrollable transaction list */}
      <div style={{
        position: 'absolute', top: 210, left: 0, right: 0, bottom: 71,
        overflowY: 'auto', padding: '4px 20px 32px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {TRANSACTIONS.map(tx => <TxRow key={tx.id} tx={tx} />)}
      </div>

      <TabBar activeTab="Accueil" theme="light" />
    </motion.div>
  )
}
