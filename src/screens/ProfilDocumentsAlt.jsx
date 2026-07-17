import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'
import ThemeToggle from '../components/ThemeToggle'
import imgWhatsApp from '../assets/wha.png'
import imgTelegram from '../assets/telegram.png'
import imgIMessage from '../assets/imessage.png'
import imgGmail from '../assets/gmail.png'

/* ─── Local SVG icons ─── */
function ChevronLeft({ color = '#fff', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  )
}
function ChevronRight({ color = '#8080A0', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  )
}
function SettingIcon({ color = '#fff', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" d="M2 12.88v-1.76a1.9 1.9 0 0 1 1.9-1.9c1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85a1.9 1.9 0 0 1 1.9 1.9v1.76a1.9 1.9 0 0 1-1.9 1.9c-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.9 1.9 0 0 1-.7-2.59c.91-1.57.17-2.85-1.64-2.85A1.9 1.9 0 0 1 2 12.88Z" />
    </svg>
  )
}
function CircleCheck({ color = '#22C55E', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m7.75 12 2.83 2.83 5.67-5.66" />
    </svg>
  )
}
function BookIcon({ color = '#818CF8', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
function DocTextIcon({ color = '#818CF8', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 22h6c5 0 7-2 7-7V9L15 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 2v4c0 1.5.5 3 3 3h4" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" d="M8 13h4M8 17h8" />
    </svg>
  )
}
function GiftIcon({ color = '#818CF8', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20 12v10H4V12M22 7H2v5h20V7z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 22V7M12 7H7.5a2.5 2.5 0 1 1 2.5-2.5C10 6 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0-2.5-2.5C14 6 12 7 12 7z" />
    </svg>
  )
}
function Share2Icon({ color = '#fff', size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="6" cy="12" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="19" r="3" stroke={color} strokeWidth="1.5" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  )
}
function CopyIcon({ color = '#818CF8', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 12.9v4.2c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M22 6.9v4.2c0 3.5-1.4 4.9-4.9 4.9H16v-3.1C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2h4.2C20.6 2 22 3.4 22 6.9Z" />
    </svg>
  )
}
function GlobalIcon({ color = '#818CF8', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10Z" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 3h1c-2.5 7.5-2.5 10.5 0 18H8M15 3c2.5 7.5 2.5 10.5 0 18" />
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 16v-1c7.5 2.5 10.5 2.5 18 0v1M3 9c7.5-2.5 10.5-2.5 18 0" />
    </svg>
  )
}
function AppearanceIcon({ color = '#818CF8', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2.03 12.42c.36 5.17 4.74 9.34 9.99 9.56 3.69.15 6.99-1.56 9.02-4.32.34-.47-.04-1.11-.61-.99-5.49 1.19-10.55-2.94-10.55-8.48 0-2.82 2.18-5.19 4.97-5.62.55-.08.82-.73.43-1.12A9.994 9.994 0 0 0 2.03 12.42Z" />
    </svg>
  )
}
function BellIcon({ color = '#818CF8', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
function MessageIcon({ color = '#818CF8', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="9" cy="11" r=".6" fill={color} />
      <circle cx="12" cy="11" r=".6" fill={color} />
      <circle cx="15" cy="11" r=".6" fill={color} />
    </svg>
  )
}
function LogoutIcon({ color = '#EF4444', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  )
}

/* ─── Settings row (dark) ─── */
function SettRow({ icon, label, value, onClick, right }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          backgroundColor: 'rgba(129,140,248,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {icon}
        </div>
        <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 400, color: '#FFFFFF' }}>
          {label}
        </span>
      </div>
      {right ? right : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 400, color: '#8080A0' }}>{value}</span>
          <ChevronRight color="#8080A0" size={16} />
        </div>
      )}
    </div>
  )
}

const REFERRAL_CODE = 'KRISMA-IE24'

const SHARE_APPS = [
  { id: 'whatsapp', label: 'WhatsApp', img: imgWhatsApp, bg: '#FFFFFF' },
  { id: 'telegram', label: 'Telegram', img: imgTelegram, bg: '#FFFFFF' },
  { id: 'imessage', label: 'Message', img: imgIMessage, bg: '#FFFFFF' },
  { id: 'email', label: 'Email', img: imgGmail, bg: '#F1F2F4' },
]

export default function ProfilDocumentsAlt() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [showShare, setShowShare] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(REFERRAL_CODE).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* PageHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', zIndex: 9,
      }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            width: 40, height: 40, borderRadius: 50,
            backgroundColor: '#141830',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <ChevronLeft color="#FFFFFF" size={20} />
        </button>
        <span style={{ fontFamily: 'Rethink Sans', fontSize: 20, fontWeight: 700, color: '#FFFFFF' }}>
          Mon profil
        </span>
        <button style={{
          width: 40, height: 40, borderRadius: 50,
          backgroundColor: '#141830',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <SettingIcon color="#FFFFFF" size={20} />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{
        position: 'absolute', top: 128, left: 0, right: 0, bottom: 77,
        overflowY: 'auto',
      }}>
        <div style={{
          padding: '8px 20px 20px 20px',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>

          {/* ProfileHero — horizontal row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 68, height: 68, borderRadius: 34,
              backgroundColor: '#141830',
              border: '2px solid #4F46E5',
              boxShadow: '0 0 18px 4px rgba(79,70,229,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'Rethink Sans', fontSize: 22, fontWeight: 800, color: '#FFFFFF' }}>IE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ fontFamily: 'Rethink Sans', fontSize: 19, fontWeight: 700, color: '#FFFFFF' }}>
                Ivan Ehouman
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CircleCheck color="#22C55E" size={14} />
                <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 400, color: '#22C55E' }}>
                  Compte vérifié
                </span>
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#818CF8' }}>
                Étudiant · Krisma
              </span>
            </div>
          </div>

          {/* StatsRow — single card with dividers */}
          <div style={{
            display: 'flex', alignItems: 'center',
            backgroundColor: '#0D1025', borderRadius: 16,
            padding: '12px 20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.33)',
          }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Oct. 2023</span>
              <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 400, color: '#8080A0' }}>Membre depuis</span>
            </div>
            <div style={{ width: 1, height: 32, backgroundColor: '#2A2A4A', flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>FR76 ****</span>
              <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 400, color: '#8080A0' }}>Mon IBAN</span>
            </div>
            <div style={{ width: 1, height: 32, backgroundColor: '#2A2A4A', flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Standard</span>
              <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 400, color: '#8080A0' }}>Abonnement</span>
            </div>
          </div>

          {/* DocSection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#737373' }}>
              Documents KYC
            </span>
            {/* DocCard_Passeport */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              backgroundColor: '#0D1025', borderRadius: 14,
              border: '0.5px solid #1E1E2E', padding: 12,
              boxShadow: '0 4px 14px rgba(0,0,0,0.31)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                backgroundColor: 'rgba(129,140,248,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <BookIcon color="#818CF8" size={20} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Passeport</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 400, color: '#8080A0' }}>Vérifié · Expire 02/2029</span>
              </div>
            </div>
            {/* DocCard_Titre de séjour */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              backgroundColor: '#0D1025', borderRadius: 14,
              border: '0.5px solid #1E1E2E', padding: 12,
              boxShadow: '0 4px 14px rgba(0,0,0,0.31)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                backgroundColor: 'rgba(129,140,248,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <DocTextIcon color="#818CF8" size={20} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Titre de séjour</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 400, color: '#8080A0' }}>Vérifié · Expire 06/2026</span>
              </div>
            </div>
          </div>

          {/* ReferralWrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#737373' }}>
              Parrainage
            </span>
            {/* RefCard — single card */}
            <div style={{
              backgroundColor: '#0D1025', borderRadius: 16,
              border: '0.5px solid #1E1E2E',
              boxShadow: '0 4px 20px rgba(0,0,0,0.33)',
              overflow: 'hidden',
            }}>
              {/* TopRow */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 11,
                    backgroundColor: 'rgba(129,140,248,0.10)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <GiftIcon color="#818CF8" size={20} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Invitez vos parents</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 400, color: '#8080A0' }}>Gagnez des récompenses</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowShare(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    backgroundColor: '#4F46E5', borderRadius: 20, padding: '8px 12px', flexShrink: 0,
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  <Share2Icon color="#FFFFFF" size={13} />
                  <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>Partager</span>
                </button>
              </div>
              {/* RefDivider */}
              <div style={{ height: 1, backgroundColor: '#1E1E2E' }} />
              {/* CodeRow */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 400, color: '#8080A0' }}>Votre code de parrainage</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 17, fontWeight: 700, color: '#FFFFFF', letterSpacing: 1.5 }}>KRISMA-IE24</span>
                </div>
                <button
                  onClick={handleCopy}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    backgroundColor: 'rgba(129,140,248,0.10)', borderRadius: 8, padding: '7px 12px', flexShrink: 0,
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  <CopyIcon color="#818CF8" size={14} />
                  <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#818CF8' }}>Copier</span>
                </button>
              </div>
            </div>
          </div>

          {/* SettWrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#737373' }}>
              Paramètres
            </span>
            {/* SettCard — single card */}
            <div style={{
              backgroundColor: '#0D1025', borderRadius: 16,
              border: '0.5px solid #1E1E2E',
              boxShadow: '0 4px 20px rgba(0,0,0,0.33)',
              overflow: 'hidden',
            }}>
              <SettRow icon={<GlobalIcon color="#818CF8" size={20} />} label="Langue" value="Français" onClick={() => navigate('/langue')} />
              <div style={{ height: 1, backgroundColor: '#1E1E2E' }} />
              <SettRow icon={<AppearanceIcon color="#818CF8" size={20} />} label="Apparence" right={<ThemeToggle />} />
              <div style={{ height: 1, backgroundColor: '#1E1E2E' }} />
              <SettRow icon={<BellIcon color="#818CF8" size={20} />} label="Notifications" value="Activées" />
              <div style={{ height: 1, backgroundColor: '#1E1E2E' }} />
              <SettRow icon={<MessageIcon color="#818CF8" size={20} />} label="Support chat 24h" value="WhatsApp" />
              <div style={{ height: 1, backgroundColor: '#1E1E2E' }} />
              {/* Row_3: Déconnexion — no right side */}
              <div style={{
                display: 'flex', alignItems: 'center',
                padding: '10px 16px',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  backgroundColor: 'rgba(239,68,68,0.094)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <LogoutIcon color="#EF4444" size={16} />
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 400, color: '#EF4444', marginLeft: 12 }}>
                  Déconnexion
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <TabBar activeTab="Profil" theme="dark" />

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', bottom: 96, left: '50%', x: '-50%',
              backgroundColor: '#4F46E5', borderRadius: 12,
              padding: '10px 20px', pointerEvents: 'none', zIndex: 50,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#FFFFFF' }}>
              Code copié !
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blur overlay + Share popup */}
      <AnimatePresence>
        {showShare && (
          <>
            {/* Blurry veil */}
            <motion.div
              key="blur-veil"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowShare(false)}
              style={{
                position: 'absolute', inset: 0, zIndex: 60,
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(0,0,0,0.35)',
              }}
            />

            {/* SharePopup — slides up from bottom */}
            <motion.div
              key="share-popup"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 61,
                backgroundColor: '#0D1025',
                borderRadius: '24px 24px 0 0',
                border: '0.5px solid #1E1E2E',
                boxShadow: '0 -12px 50px rgba(0,0,0,0.60)',
                display: 'flex', flexDirection: 'column', gap: 5,
              }}
            >
              {/* Handle */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 6px' }}>
                <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#2A2A4A' }} />
              </div>

              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 20px 18px 20px',
                borderBottom: '1px solid #1A1A2E',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: 'Rethink Sans', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
                    Partager votre code
                  </span>
                  <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 400, color: '#8080A0' }}>
                    Choisissez comment envoyer
                  </span>
                </div>
                <button
                  onClick={() => setShowShare(false)}
                  style={{
                    width: 32, height: 32, borderRadius: 16, backgroundColor: '#737373',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
                    <path stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Apps row */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: 110,
              }}>
                {SHARE_APPS.map(app => (
                  <div key={app.id} style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 10,
                  }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: 30,
                      backgroundColor: app.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img src={app.img} alt={app.label} style={{ width: 33, height: 33, objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 400, color: '#FFFFFF', textAlign: 'center' }}>
                      {app.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: '#1E1E2E' }} />

              {/* Home indicator */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 16px' }}>
                <div style={{ width: 120, height: 5, borderRadius: 3, backgroundColor: '#2A2A4A' }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
