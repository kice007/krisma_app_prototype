import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, CircleCheck, ShieldAlert } from 'lucide-react'
import StatusBar from '../components/StatusBar'

function ChevronLeft({ color = '#fff', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function MoneySendIcon({ color = '#22C55E', size = 20 }) {
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

function NotifCard({ iconBg, iconEl, title, body, time, unread = false, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        borderRadius: 14,
        backgroundColor: unread ? '#0D1025' : 'transparent',
        border: '1px solid #2A2A4A',
        padding: '14px 16px',
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12, backgroundColor: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {iconEl}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: unread ? 700 : 600, color: '#FFFFFF' }}>
          {title}
        </span>
        <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {body}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, width: 60, flexShrink: 0 }}>
        <span style={{ fontFamily: 'Inter', fontSize: 11, color: unread ? '#4F46E5' : '#737373' }}>{time}</span>
        {unread && <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4F46E5' }} />}
      </div>
    </div>
  )
}

function SectionLabel({ label }) {
  return (
    <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 13, fontWeight: 700, color: '#737373' }}>
      {label}
    </span>
  )
}

export default function ParentNotifications() {
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
          onClick={() => navigate('/parent-dashboard')}
          style={{
            width: 36, height: 36, borderRadius: 50, backgroundColor: '#141830',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronLeft color="#FFFFFF" size={20} />
        </button>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
          Notifications
        </span>
        {activeTab === 'unread' ? (
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#818CF8' }}>Tout lire</span>
          </button>
        ) : (
          <div style={{ width: 36, height: 36 }} />
        )}
      </div>

      {/* Scrollable content */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0, bottom: 0,
        overflowY: 'auto', padding: '8px 20px 32px',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        {/* Tab switcher */}
        <div style={{
          display: 'flex', gap: 4, backgroundColor: '#141830',
          borderRadius: 12, padding: 4, height: 44, flexShrink: 0,
        }}>
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
              <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 700, color: activeTab === 'unread' ? '#4F46E5' : '#AAAACC' }}>
                {activeTab === 'unread' ? '2' : '0'}
              </span>
            </div>
          </button>
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
          /* P-13a — Non lu */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionLabel label="Aujourd'hui" />
              <NotifCard
                iconBg="rgba(34,197,94,0.094)"
                iconEl={<MoneySendIcon color="#22C55E" size={20} />}
                title="Argent envoyé"
                body="EUR 300 envoyés à Ivan Ehouman"
                time="10:24"
                unread
                onClick={() => navigate('/parent-notification-detail')}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionLabel label="Cette semaine" />
              <NotifCard
                iconBg="rgba(14,165,233,0.094)"
                iconEl={<ArrowUpRight size={20} color="#0EA5E9" strokeWidth={1.5} />}
                title="Transfert confirmé"
                body="EUR 150 à Marie Bakayoko"
                time="Lundi"
                unread
                onClick={() => navigate('/parent-notification-detail')}
              />
            </div>
          </div>
        ) : (
          /* P-13b — Lu */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionLabel label="Aujourd'hui" />
              <NotifCard
                iconBg="rgba(34,197,94,0.094)"
                iconEl={<MoneySendIcon color="#22C55E" size={20} />}
                title="Argent envoyé"
                body="EUR 300 envoyés à Ivan Ehouman"
                time="10:24"
                onClick={() => navigate('/parent-notification-detail')}
              />
              <NotifCard
                iconBg="rgba(79,70,229,0.094)"
                iconEl={<CircleCheck size={20} color="#4F46E5" strokeWidth={1.5} />}
                title="Bienvenue sur Krisma !"
                body="Votre compte est prêt à l'emploi"
                time="08:00"
                onClick={() => navigate('/parent-notification-detail')}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionLabel label="Cette semaine" />
              <NotifCard
                iconBg="rgba(14,165,233,0.094)"
                iconEl={<ArrowUpRight size={20} color="#0EA5E9" strokeWidth={1.5} />}
                title="Transfert confirmé"
                body="EUR 150 à Marie Bakayoko"
                time="Lundi"
                onClick={() => navigate('/parent-notification-detail')}
              />
              <NotifCard
                iconBg="rgba(245,158,11,0.094)"
                iconEl={<ShieldAlert size={20} color="#F59E0B" strokeWidth={1.5} />}
                title="Tentative de connexion"
                body="Connexion depuis un nouveau téléphone"
                time="Samedi"
                onClick={() => navigate('/parent-notification-detail')}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
