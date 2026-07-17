import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Shield, X, CreditCard } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import logoVisa from '../assets/logo-visa.png'
import logoMastercard from '../assets/logo-mastercard.png'

const SENDER = { name: 'Mastercard', mask: '**** 7865' }
const RECIPIENT = {
  name: 'Rayford Chenail',
  mask: '**** 3261',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop',
}

const row = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  border: '1px solid #DDDDE8', borderRadius: 14, padding: '14px 16px', gap: 12,
}

export default function EnvoyerConfirmationLight() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#4F46E5' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <style>{`.ecl-note::placeholder { color: #AAAABC; }`}</style>
      <StatusBar />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div onClick={() => navigate('/envoyer-montant-light')} style={{
          width: 40, height: 40, borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
          Envoyer de l'argent
        </span>
        <div style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#1A1A3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={17} color="#FFFFFF" strokeWidth={2} />
        </div>
      </div>

      {/* Sheet */}
      <div style={{
        position: 'absolute', top: 124, left: 0, right: 0, bottom: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: '28px 28px 0 0',
        display: 'flex', flexDirection: 'column',
        padding: '16px 20px 32px',
        gap: 14,
      }}>

        {/* Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#D8D8E8' }} />
        </div>

        {/* Sheet header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>
            Envoyer de l'argent
          </span>
          <div onClick={() => navigate('/dashboard-light')} style={{
            width: 32, height: 32, borderRadius: 16, backgroundColor: '#DDDDE8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <X size={16} color="#1A1A2E" strokeWidth={2} />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: '#DDDDE8' }} />

        {/* From */}
        <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>From:</span>
        <div style={row}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20, flexShrink: 0,
              backgroundColor: 'rgba(79,70,229,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CreditCard size={18} color="#818cf8" strokeWidth={1.5} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{SENDER.name}</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{SENDER.mask}</span>
            </div>
          </div>
          <img src={logoMastercard} alt="Mastercard" style={{ height: 20, objectFit: 'contain', flexShrink: 0 }} />
        </div>

        {/* Transfer to */}
        <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>Transfer to:</span>
        <div style={row}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={RECIPIENT.img} alt={RECIPIENT.name} style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{RECIPIENT.name}</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{RECIPIENT.mask}</span>
            </div>
          </div>
          <img src={logoVisa} alt="Visa" style={{ height: 12, objectFit: 'contain', flexShrink: 0 }} />
        </div>

        {/* Note */}
        <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>Note:</span>
        <div style={{
          border: '1px solid #DDDDE8', borderRadius: 14, padding: '14px 16px',
          flex: 1, display: 'flex',
        }}>
          <textarea
            className="ecl-note"
            placeholder="Votre note..."
            style={{
              flex: 1, border: 'none', outline: 'none',
              background: 'transparent', resize: 'none',
              fontFamily: 'Inter', fontSize: 14, color: '#1A1A2E',
            }}
          />
        </div>

        {/* Confirm */}
        <button
          onClick={() => navigate('/envoyer-succes-light')}
          style={{
            height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
            border: 'none', cursor: 'pointer',
            fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
          }}
        >
          Confirmer la transaction
        </button>
      </div>
    </motion.div>
  )
}
