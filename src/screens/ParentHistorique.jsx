import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, SlidersHorizontal, Search } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import ParentTabBar from '../components/ParentTabBar'
import ParentFilterSheet from '../components/ParentFilterSheet'

const ALL_TRANSACTIONS = [
  { id: 1, initials: 'IV', color: '#4F46E5', name: 'Ivan Ehouman',    date: 'Auj. 08:30',  amount: '- EUR 300', badge: 'Reçu',     badgeColor: '#22C55E', status: 'Terminé'   },
  { id: 2, initials: 'MB', color: '#EC4899', name: 'Marie Bakayoko',  date: 'Hier, 14:00', amount: '- EUR 150', badge: 'Envoyé',   badgeColor: '#818CF8', status: 'Terminé'   },
  { id: 3, initials: 'AK', color: '#F59E0B', name: 'Awo Konaté',      date: '03/06/2026',  amount: '- EUR 200', badge: 'En cours', badgeColor: '#F59E0B', status: 'En attente'},
  { id: 4, initials: 'IV', color: '#4F46E5', name: 'Ivan Ehouman',    date: '28/05/2026',  amount: '- EUR 300', badge: 'Reçu',     badgeColor: '#22C55E', status: 'Terminé'   },
  { id: 5, initials: 'MB', color: '#EC4899', name: 'Marie Bakayoko',  date: '20/05/2026',  amount: '- EUR 100', badge: 'Reçu',     badgeColor: '#22C55E', status: 'Terminé'   },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function ParentHistorique() {
  const navigate = useNavigate()
  const [filterOpen, setFilterOpen]     = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  const [appliedStatus, setAppliedStatus] = useState('Tous')
  const [searchText, setSearchText]     = useState('')

  const displayed = ALL_TRANSACTIONS.filter(tx => {
    const matchStatus = appliedStatus === 'Tous' || tx.status === appliedStatus
    const matchSearch = !searchText || tx.name.toLowerCase().includes(searchText.toLowerCase())
    return matchStatus && matchSearch
  })

  function handleApply(period, status) {
    setAppliedStatus(status)
    setFilterActive(status !== 'Tous')
  }

  function handleReset() {
    setAppliedStatus('Tous')
    setFilterActive(false)
  }

  const filterBg = filterActive ? '#4F46E5' : '#141830'

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* PageHdr */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 56, padding: '0 20px', marginTop: 62,
      }}>
        <div
          onClick={() => navigate('/parent-dashboard')}
          style={{
            width: 36, height: 36, borderRadius: 50,
            backgroundColor: '#141830',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>

        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 20, fontWeight: 800, color: '#FFFFFF' }}>
          Mes transferts
        </span>

        <motion.div
          onClick={() => setFilterOpen(true)}
          animate={{ backgroundColor: filterBg }}
          transition={{ duration: 0.25 }}
          style={{
            width: 36, height: 36, borderRadius: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <SlidersHorizontal size={17} color="#FFFFFF" strokeWidth={2} />
        </motion.div>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        display: 'flex', flexDirection: 'column', gap: 12,
        padding: '8px 20px 16px',
      }}>

        {/* Search bar */}
        <motion.div {...fadeUp(0)} style={{
          height: 50, borderRadius: 14,
          backgroundColor: '#141830', border: '1px solid #2A2A4A',
          padding: '0 16px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Search size={17} color="#737373" strokeWidth={1.75} />
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Rechercher un transfert"
            style={{
              flex: 1, border: 'none', outline: 'none',
              backgroundColor: 'transparent',
              fontFamily: 'Inter', fontSize: 14, color: '#FFFFFF',
              caretColor: '#4F46E5',
            }}
          />
        </motion.div>

        {/* TotalCard */}
        <motion.div {...fadeUp(0.05)} style={{
          borderRadius: 14,
          backgroundColor: '#141830', border: '1px solid #2A2A4A',
          padding: '16px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#A0A0C0' }}>Total envoyé ce mois</span>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 24, fontWeight: 800, color: '#FFFFFF' }}>
              EUR 650
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#A0A0C0' }}>Juin 2026</span>
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#818CF8' }}>3 transferts</span>
          </div>
        </motion.div>

        {/* Transaction rows */}
        {displayed.map((tx, i) => (
          <motion.div
            key={tx.id}
            {...fadeUp(0.08 + i * 0.04)}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderRadius: 12, border: '1px solid #161c2c',
              padding: '14px 16px', cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 22,
                backgroundColor: tx.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
                  {tx.initials}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{tx.name}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{tx.date}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
                {tx.amount}
              </span>
              <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: tx.badgeColor }}>
                {tx.badge}
              </span>
            </div>
          </motion.div>
        ))}

        {displayed.length === 0 && (
          <div style={{
            paddingTop: 48,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#555577', textAlign: 'center' }}>
              Aucun transfert ne correspond à vos filtres.
            </span>
          </div>
        )}
      </div>

      <ParentTabBar activeTab="Historique" theme="dark" />

      <ParentFilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApply}
        onReset={handleReset}
        isActive={filterActive}
        theme="dark"
      />
    </motion.div>
  )
}
