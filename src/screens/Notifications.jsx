import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '../components/StatusBar'

function ChevronLeft({ color = '#fff', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function MoneyReceivedIcon({ color = '#22C55E', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M2.5 6.667A2.083 2.083 0 0 1 4.583 4.583h10.834A2.083 2.083 0 0 1 17.5 6.667v6.666A2.083 2.083 0 0 1 15.417 15.417H4.583A2.083 2.083 0 0 1 2.5 13.333V6.667z" />
      <circle cx="10" cy="10" r="2.083" stroke={color} strokeWidth="1.5" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" d="M2.5 7.5h2.083M15.417 7.5H17.5M2.5 12.5h2.083M15.417 12.5H17.5" />
    </svg>
  )
}

function GraduationCapIcon({ color = '#818CF8', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M2.5 7.5l7.5-3.75 7.5 3.75-7.5 3.75-7.5-3.75z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M5.833 9.167v3.75c0 1.25 1.875 2.5 4.167 2.5s4.167-1.25 4.167-2.5V9.167" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round"
        d="M17.5 7.5v4.167" />
    </svg>
  )
}

function ShieldIcon({ color = '#4F46E5', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M10 1.875L3.125 5v5c0 4.375 3.021 7.188 6.875 8.125C13.854 17.188 16.875 14.375 16.875 10V5L10 1.875z" />
    </svg>
  )
}

function BellIcon({ color = '#737373', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M10 2.5a5 5 0 0 0-5 5c0 5.833-2.5 7.5-2.5 7.5h15s-2.5-1.667-2.5-7.5a5 5 0 0 0-5-5z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        d="M11.44 17.5a1.667 1.667 0 0 1-2.88 0" />
    </svg>
  )
}

function NotifCard({ iconBg, icon, title, body, time, unread = false, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        borderRadius: 14, border: '0.5px solid #1E1E2E',
        padding: '14px 16px',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12, backgroundColor: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{title}</span>
        <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 400, color: '#A3A3A3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{body}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, width: 60, flexShrink: 0 }}>
        <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 400, color: unread ? '#FFFFFF' : '#555577' }}>{time}</span>
        {unread && <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' }} />}
      </div>
    </div>
  )
}

function SectionLabel({ label }) {
  return (
    <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: 0.4 }}>
      {label}
    </span>
  )
}

export default function Notifications() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('unread')

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* SubHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', zIndex: 9,
      }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            width: 40, height: 40, borderRadius: 50, backgroundColor: '#141830',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronLeft color="#FFFFFF" size={20} />
        </button>
        <span style={{ fontFamily: 'Rethink Sans', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
          Notifications
        </span>
        {activeTab === 'unread' ? (
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 400, color: '#818CF8' }}>Tout lire</span>
          </button>
        ) : (
          <div style={{ width: 40, height: 40 }} />
        )}
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0, bottom: 0,
        overflowY: 'auto',
        padding: '8px 20px 32px 20px',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        {/* Tab switcher */}
        <div style={{
          display: 'flex', gap: 4,
          backgroundColor: '#141830', borderRadius: 12,
          padding: 4, height: 44, flexShrink: 0,
        }}>
          {/* Non lu tab */}
          <button
            onClick={() => setActiveTab('unread')}
            style={{
              flex: 1, borderRadius: 8, border: 'none', cursor: 'pointer',
              backgroundColor: activeTab === 'unread' ? '#4F46E5' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: activeTab === 'unread' ? '#FFFFFF' : '#555577' }}>
              Non lu
            </span>
            <div style={{
              width: 18, height: 18, borderRadius: 9,
              backgroundColor: activeTab === 'unread' ? '#FFFFFF' : '#3A3A5A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 700, color: activeTab === 'unread' ? '#4F46E5' : '#AAAACC' }}>1</span>
            </div>
          </button>
          {/* Lu tab */}
          <button
            onClick={() => setActiveTab('read')}
            style={{
              flex: 1, borderRadius: 8, border: 'none', cursor: 'pointer',
              backgroundColor: activeTab === 'read' ? '#4F46E5' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: activeTab === 'read' ? '#FFFFFF' : '#555577' }}>
              Lu
            </span>
          </button>
        </div>

        {activeTab === 'unread' ? (
          /* ── Non lu content ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SectionLabel label="Aujourd'hui" />
            <NotifCard
              iconBg="rgba(34,197,94,0.094)"
              icon={<MoneyReceivedIcon color="#22C55E" size={20} />}
              title="Argent reçu"
              body="Papa vous a envoyé EUR 300"
              time="Maintenant"
              unread
              onClick={() => navigate('/notification-detail')}
            />
          </div>
        ) : (
          /* ── Lu content ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Today */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionLabel label="Aujourd'hui" />
              <NotifCard
                iconBg="rgba(129,140,248,0.094)"
                icon={<GraduationCapIcon color="#818CF8" size={20} />}
                title="Scolarité payée"
                body="Université de Poitier · EUR 450"
                time="il y a 5h"
              />
            </div>
            {/* This week */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionLabel label="Cette semaine" />
              <NotifCard
                iconBg="rgba(79,70,229,0.094)"
                icon={<ShieldIcon color="#4F46E5" size={20} />}
                title="Garantie locative"
                body="Renouvellement automatique · EUR 10"
                time="il y a 3j"
              />
              <NotifCard
                iconBg="rgba(115,115,115,0.094)"
                icon={<BellIcon color="#737373" size={20} />}
                title="Krisma"
                body="Nouveau taux de change disponible"
                time="il y a 6j"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
