import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'
import FilterSheet from '../components/FilterSheet'
import avatarAlex from '../assets/avatar-alex.png'
import avatarMarc from '../assets/avatar-marc.png'
import avatarSmith from '../assets/avatar-smith.png'

function PhotoAvatar({ src, size = 46 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      overflow: 'hidden', flexShrink: 0,
    }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

function FigmaIcon({ size = 46 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: '#eeecff', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={20} height={20} viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
      </svg>
    </div>
  )
}

function MediumIcon({ size = 46 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: '#fbeecdff', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={22} height={13} viewBox="0 0 69 40" fill="#000">
        <circle cx="20" cy="20" r="20" />
        <ellipse cx="49" cy="20" rx="9" ry="18" />
        <ellipse cx="63.5" cy="20" rx="5.5" ry="13.5" />
      </svg>
    </div>
  )
}

function TxRow({ name, date, amount, amountColor, type, icon, route, navigate }) {
  return (
    <div onClick={() => route && navigate(route)} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderRadius: 14, border: '0.5px solid #1E1E2E',
      padding: '14px 16px',
      cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {icon}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{name}</span>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{date}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: amountColor }}>
          {amount}
        </span>
        <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#737373' }}>{type}</span>
      </div>
    </div>
  )
}

const RECENT = [
  {
    id: 'figma', name: 'Figma', date: "Aujourd'hui, 12:30",
    amount: '- EUR 100', amountColor: '#FFFFFF', type: 'Abonnement',
    icon: <FigmaIcon />,
  },
  {
    id: 'alex', name: 'De Alex', date: 'Hier, 08:00',
    amount: '+ EUR 58.000', amountColor: '#22C55E', type: 'Dépôt',
    icon: <PhotoAvatar src={avatarAlex} />,
  },
  {
    id: 'medium', name: 'Medium', date: '10 Mai, 18:00',
    amount: '- EUR 99.00', amountColor: '#FFFFFF', type: 'Souscription',
    icon: <MediumIcon />,
  },
]

const MARCH = [
  {
    id: 'marc', name: 'Envoyé à Marc', date: '29 Mars, 16:15',
    amount: '- EUR 160.00', amountColor: '#FFFFFF', type: 'Transfert',
    icon: <PhotoAvatar src={avatarMarc} />, route: '/transaction-detail',
  },
  {
    id: 'dribbble', name: 'Dribbble Pro', date: '16 Mars, 20:00',
    amount: '- EUR 160.00', amountColor: '#FFFFFF', type: 'Souscription',
    icon: (
      <div style={{
        width: 46, height: 46, borderRadius: 23,
        backgroundColor: '#818CF81A', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: '#818cf8' }}>D</span>
      </div>
    ),
  },
  {
    id: 'smith', name: 'Envoyé à Smith', date: '14 Mars, 14:15',
    amount: '- EUR 90.00', amountColor: '#FFFFFF', type: 'Erreur transfert',
    icon: <PhotoAvatar src={avatarSmith} />,
  },
]

export default function Transactions() {
  const navigate = useNavigate()
  const [filterOpen, setFilterOpen] = useState(false)
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
        <div style={{
          width: 40, height: 40, borderRadius: 50,
          backgroundColor: '#141830',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }} onClick={() => navigate(-1)}>
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
          Transactions
        </span>
        <div
          onClick={() => setFilterOpen(true)}
          style={{
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: '#141830',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={1.75} />
        </div>
      </div>

      {/* Search — fixed strip below SubHeader */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0,
        padding: '12px 20px', backgroundColor: '#0A0A0F',
      }}>
        <div style={{
          height: 50, borderRadius: 14, backgroundColor: '#141830',
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '0 16px',
        }}>
          <Search size={18} color="#FFFFFF" strokeWidth={1.75} />
          <span style={{ fontFamily: 'Inter', fontSize: 15, color: '#737373' }}>Rechercher</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{
        position: 'absolute', top: 196, left: 0, right: 0, bottom: 77,
        overflowY: 'auto', padding: '16px 20px 32px',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>

        <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#737373', letterSpacing: 0.5 }}>
          Recent
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: -10 }}>
          {RECENT.map(tx => <TxRow key={tx.id} {...tx} navigate={navigate} />)}
        </div>

        <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#737373', letterSpacing: 0.5 }}>
          March 2026
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: -10 }}>
          {MARCH.map(tx => <TxRow key={tx.id} {...tx} navigate={navigate} />)}
        </div>

      </div>

      <TabBar activeTab="Accueil" theme="dark" />
      <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} onApply={() => { setFilterOpen(false); navigate('/transactions-filtered') }} theme="dark" />
    </motion.div>
  )
}
