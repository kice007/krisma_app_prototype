import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Download } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import orangeMoneyLogo from '../assets/orange-money.png'
import mtnLogo from '../assets/mtn-logo.jpg'
import waveLogo from '../assets/wave.png'

const LOGOS = { om: orangeMoneyLogo, mtn: mtnLogo, wave: waveLogo }
const PHONES = {
  om: 'Orange Money · +225 07 •••••• 07',
  mtn: 'MTN MoMo · +225 05 •••••• 05',
  wave: 'Wave · +225 01 •••••• 01',
}

function fmtAmount(cents) {
  const euros = Math.floor(cents / 100)
  const c = cents % 100
  const eurosStr = euros === 0 ? '00' : euros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${eurosStr}.${c.toString().padStart(2, '0')}`
}

export default function ParentEnvoyerSucces() {
  const navigate = useNavigate()
  const location = useLocation()
  const cents = location.state?.cents ?? 30000
  const logo = location.state?.logo ?? 'om'
  const method = location.state?.method ?? 'Orange Money'

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <style>{`
        @keyframes succPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.09); opacity: 0.65; }
        }
        .succ-pulse { animation: succPulse 2.4s ease-in-out infinite; }
      `}</style>

      {/* Radial purple glow */}
      <div style={{
        position: 'absolute', top: 93, left: 0,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(79,70,229,0) 70%)',
        pointerEvents: 'none',
      }} />

      <StatusBar />

      {/* Center content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 16, padding: '0 24px',
      }}>
        {/* SuccessRings with pulse */}
        <div className="succ-pulse" style={{ position: 'relative', width: 200, height: 200, flexShrink: 0 }}>
          {/* Outer ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            backgroundColor: 'rgba(79,70,229,0.08)',
          }} />
          {/* Mid ring */}
          <div style={{
            position: 'absolute', top: 30, left: 30, right: 30, bottom: 30,
            borderRadius: '50%', backgroundColor: 'rgba(79,70,229,0.15)',
          }} />
          {/* Inner circle + check */}
          <div style={{
            position: 'absolute', top: 65, left: 65, width: 70, height: 70,
            borderRadius: '50%', backgroundColor: '#4F46E5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Check size={28} color="#FFFFFF" strokeWidth={2.5} />
          </div>
        </div>

        <p style={{
          fontFamily: '"Rethink Sans", sans-serif', fontSize: 32, fontWeight: 800,
          color: '#FFFFFF', margin: 0, textAlign: 'center',
        }}>
          EUR {fmtAmount(cents)} envoyés !
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#A0A0C0',
          margin: 0, textAlign: 'center',
        }}>
          Ivan a été notifié instantanément
        </p>

        {/* Payment method pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          backgroundColor: '#141830', borderRadius: 12,
          padding: '12px 18px', border: '1px solid #2A2A4A',
          width: 295,
        }}>
          <img src={LOGOS[logo]} style={{ width: 28, height: 28, borderRadius: 22, objectFit: 'cover', flexShrink: 0 }} alt={method} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFFFFF' }}>
            {PHONES[logo]}
          </span>
        </div>
      </div>

      {/* Bottom buttons */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 12,
        padding: '0 20px 36px',
      }}>
        {/* Download receipt */}
        <button style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', height: 52, borderRadius: 14,
          backgroundColor: '#141830', border: '1px solid #2A2A4A', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#FFFFFF',
        }}>
          <Download size={16} color="#FFFFFF" strokeWidth={2} />
          Télécharger le reçu PDF
        </button>

        {/* Send again */}
        <button
          onClick={() => navigate('/parent-envoyer-beneficiaire')}
          style={{
            width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
            border: 'none', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, color: '#FFFFFF',
          }}
        >
          Envoyer à nouveau
        </button>

        {/* Home link */}
        <p
          onClick={() => navigate('/parent-dashboard')}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#818CF8',
            textAlign: 'center', margin: 0, cursor: 'pointer',
          }}
        >
          Retour à l'accueil
        </p>
      </div>
    </motion.div>
  )
}
