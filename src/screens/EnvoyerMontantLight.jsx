import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Shield, Calendar } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import logoVisa from '../assets/logo-visa.png'

const DEFAULT_RECIPIENT = {
  name: 'Rayford Chenail',
  mask: '•••• 3261',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop',
}

const PAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '←'],
]

function displayCents(c) {
  if (c === 0) return '00.00'
  const int = Math.floor(c / 100)
  const dec = String(c % 100).padStart(2, '0')
  const intFmt = int === 0 ? '0' : int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${intFmt}.${dec}`
}

export default function EnvoyerMontantLight() {
  const navigate = useNavigate()
  const location = useLocation()
  const recipient = location.state?.recipient ?? DEFAULT_RECIPIENT
  const [cents, setCents] = useState(0)
  const [showPad, setShowPad] = useState(false)
  const [note, setNote] = useState('')

  function press(k) {
    if (k === '←') {
      setCents(c => Math.floor(c / 10))
    } else if (k !== '*') {
      const d = parseInt(k)
      setCents(c => {
        const next = c * 10 + d
        return next <= 9999999 ? next : c
      })
    }
  }

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#4F46E5' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <style>{`
        @keyframes emlBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .eml-cursor { animation: emlBlink 1s step-end infinite; user-select:none; }
        .eml-note::placeholder { color: #737373; }
      `}</style>

      <StatusBar />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 44, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div onClick={() => navigate('/envoyer-destinataire-light')} style={{
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

      {/* Card */}
      <div style={{
        position: 'absolute', top: 114, left: 0, right: 0, bottom: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: '28px 28px 0 0',
        overflow: 'hidden',
      }}>

        {/* Static content */}
        <div style={{ padding: '16px 20px 0' }}>

          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 20 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#D8D8E8' }} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>Entrer le montant</span>
          </div>

          {/* Amount — tap to toggle numpad */}
          <div
            onClick={() => setShowPad(p => !p)}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, cursor: 'pointer' }}
          >
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 42, fontWeight: 800, color: '#1A1A2E' }}>
              EUR {displayCents(cents)}<span className="eml-cursor" style={{ fontWeight: 200, color: '#4F46E5' }}>|</span>
            </span>
          </div>

          {/* Recipient */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid #DDDDE8', borderRadius: 14, padding: '14px 16px',
            gap: 12, marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {recipient.img ? (
                <img src={recipient.img} alt={recipient.name} style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
                    {recipient.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{recipient.name}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{recipient.mask}</span>
              </div>
            </div>
            <img src={logoVisa} alt="Visa" style={{ height: 12, objectFit: 'contain', flexShrink: 0 }} />
          </div>

          {/* Note */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid #DDDDE8', borderRadius: 14, height: 50, padding: '0 16px',
          }}>
            <input
              type="text"
              className="eml-note"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Ajouter une note..."
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'Inter', fontSize: 14, color: '#1A1A2E',
              }}
            />
            <Calendar size={18} color="#737373" strokeWidth={1.5} />
          </div>
        </div>

        {/* NumPad + button — slides up from bottom */}
        <AnimatePresence>
          {showPad && (
            <motion.div
              key="numpad-light"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                backgroundColor: '#FFFFFF',
                padding: '12px 20px 20px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}
            >
              {PAD.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', gap: 8 }}>
                  {row.map(k => (
                    <button
                      key={k}
                      onClick={() => press(k)}
                      style={{
                        flex: 1, height: 70, borderRadius: 14, backgroundColor: '#EBEBF2',
                        border: 'none', cursor: 'pointer',
                        fontFamily: 'Inter', fontSize: 24, color: '#1A1A2E',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              ))}
              <button
                onClick={() => navigate('/envoyer-confirmation-light')}
                style={{
                  width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
                  border: 'none', cursor: 'pointer', marginTop: 4,
                  fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
                }}
              >
                Envoyer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
