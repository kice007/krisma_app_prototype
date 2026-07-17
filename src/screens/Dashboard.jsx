import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, GraduationCap, Menu, Bell, Eye, ArrowUpRight } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'
import gerard from '../assets/gerard.jpg'

const AVATAR = 'https://images.unsplash.com/photo-1639761189479-9b81abcc5d50?w=200&q=80&fit=crop'

function FigmaIcon() {
  return (
    <svg width="13" height="20" viewBox="0 0 200 300" fill="none">
      <path d="M100 150C100 122.386 122.386 100 150 100C177.614 100 200 122.386 200 150C200 177.614 177.614 200 150 200C122.386 200 100 177.614 100 150Z" fill="#1ABCFE"/>
      <path d="M0 250C0 222.386 22.3858 200 50 200H100V250C100 277.614 77.6142 300 50 300C22.3858 300 0 277.614 0 250Z" fill="#0ACF83"/>
      <path d="M0 150C0 122.386 22.3858 100 50 100H100V200H50C22.3858 200 0 177.614 0 150Z" fill="#A259FF"/>
      <path d="M0 50C0 22.3858 22.3858 0 50 0H100V100H50C22.3858 100 0 77.6142 0 50Z" fill="#F24E1E"/>
      <path d="M100 0H150C177.614 0 200 22.3858 200 50C200 77.6142 177.614 100 150 100H100V0Z" fill="#FF7262"/>
    </svg>
  )
}

function MediumIcon({ color = '#000' }) {
  return (
    <svg width="22" height="13" viewBox="0 0 69 40" fill={color}>
      <circle cx="20" cy="20" r="20"/>
      <ellipse cx="49" cy="20" rx="9" ry="18"/>
      <ellipse cx="63.5" cy="20" rx="5.5" ry="13.5"/>
    </svg>
  )
}

const ACTIONS = [
  { Icon: ArrowUp, label: 'Envoyer' },
  { Icon: ArrowDown, label: 'Demande' },
  { Icon: GraduationCap, label: 'Scolarité' },
  { Icon: Menu, label: 'Plus' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {/* Purple glow */}
      <div style={{
        position: 'absolute', left: 0, top: 42,
        width: 390, height: 283, borderRadius: 173,
        backgroundColor: '#5855E8',
        filter: 'blur(30px)', opacity: 0.22,
        pointerEvents: 'none',
      }} />

      <StatusBar />

      {/* Scrollable content */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, bottom: 77,
        display: 'flex', flexDirection: 'column', gap: 20,
        padding: '16px 20px 24px',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden', flexShrink: 0 }}>
              <img src={AVATAR} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
              Salut, Christ
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => navigate('/notifications')}
              style={{
                width: 44, height: 44, borderRadius: 22,
                backgroundColor: '#141830', border: '1px solid #2A2A4A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Bell size={20} color="#FFFFFF" strokeWidth={1.5} />
            </div>
            <div style={{
              position: 'absolute', top: 8, right: 8,
              width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444',
            }} />
          </div>
        </div>

        {/* Balance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#9494B8' }}>Solde total</span>
            <Eye size={14} color="#9494B8" strokeWidth={1.5} />
          </div>
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 38, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
            EUR 12 765,00
          </span>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {ACTIONS.map(({ Icon, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                onClick={() => {
                  if (label === 'Envoyer') navigate('/envoyer-destinataire')
                  else if (label === 'Demande') navigate('/demande-destinataire')
                  else if (label === 'Scolarité') navigate('/scolarite-montant')
                }}
                style={{
                width: 56, height: 56, borderRadius: 28, boxSizing: 'border-box',
                backgroundColor: '#0D1025', border: '7px solid #4F46E5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <Icon size={20} color="#FFFFFF" strokeWidth={2} />
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: '#FFFFFF' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Promo Banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'linear-gradient(135deg, #2A20C0 0%, #4F46E5 100%)',
          borderRadius: 16, padding: 20, cursor: 'pointer',
        }}>
          <span style={{
            flex: 1, fontFamily: '"Rethink Sans", sans-serif',
            fontSize: 14, fontWeight: 700, color: '#FFFFFF',
            whiteSpace: 'pre-wrap',
          }}>
            {'Invitez un ami, \ngagnez du cashback'}
          </span>
          <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.031)' }} />
            <div style={{ position: 'absolute', top: 11, left: 11, width: 50, height: 50, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.059)' }} />
            <div style={{ position: 'absolute', top: 21, left: 21, width: 30, height: 30, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.102)' }} />
            <ArrowUpRight size={16} color="rgba(255,255,255,0.73)" style={{ position: 'absolute', top: 28, left: 28 }} />
          </div>
        </div>

        {/* Transactions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
              Transactions
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#818CF8', cursor: 'pointer' }}
              onClick={() => navigate('/transactions')}>
              Voir tout
            </span>
          </div>

          {/* Figma */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 10, border: '0.5px solid #1E1E2E' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: '#EEECFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FigmaIcon />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Figma</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Aujourd'hui, 12:30</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>- EUR 100</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Abonnement</span>
            </div>
          </div>

          {/* De Alex */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 10, border: '0.5px solid #1E1E2E' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, overflow: 'hidden', flexShrink: 0 }}>
                <img src={gerard} alt="De Alex" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>De Alex</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Hier, 08:00</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: '#22C55E' }}>+ EUR 58,000</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Dépôt</span>
            </div>
          </div>

          {/* Medium */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, border: '0.5px solid #1E1E2E' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: '#FBEECD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MediumIcon />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Medium</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>10 Mai, 18:00</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>- EUR 99.00</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Souscription</span>
            </div>
          </div>
        </div>
      </div>

      <TabBar activeTab="Accueil" theme="dark" />
    </motion.div>
  )
}
