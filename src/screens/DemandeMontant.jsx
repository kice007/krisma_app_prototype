import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Shield, Calendar, X } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import logoVisa from '../assets/logo-visa.png'

const RECIPIENT = {
  name: 'Amadou Aka',
  mask: '•••• 4532',
  img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80&fit=crop',
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

export default function DemandeMontant() {
  const navigate = useNavigate()
  const [cents, setCents] = useState(0)
  const [showPad, setShowPad] = useState(false)
  const [note, setNote] = useState('')
  const [showRecap, setShowRecap] = useState(false)

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
        @keyframes dmBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .dm-cursor { animation: dmBlink 1s step-end infinite; user-select:none; }
        .dm-note::placeholder { color: #737373; }
      `}</style>

      <StatusBar />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div
          onClick={() => navigate('/demande-destinataire')}
          style={{
            width: 40, height: 40, borderRadius: 20,
            backgroundColor: 'rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
          Demander de l'argent
        </span>
        <div style={{
          width: 36, height: 36, borderRadius: 18,
          backgroundColor: '#1A1A3A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Shield size={17} color="#FFFFFF" strokeWidth={2} />
        </div>
      </div>

      {/* Inner sheet */}
      <div style={{
        position: 'absolute', top: 142, left: 0, right: 0, bottom: 0,
        backgroundColor: '#0a0a0f',
        borderRadius: '28px 28px 0 0',
        overflow: 'hidden',
      }}>
        {/* Static content */}
        <div style={{ padding: '28px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>Entrer le montant</span>
          </div>

          {/* Amount */}
          <div
            onClick={() => setShowPad(p => !p)}
            style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 42, fontWeight: 800, color: '#FFFFFF' }}>
              EUR {displayCents(cents)}<span className="dm-cursor" style={{ fontWeight: 200 }}>|</span>
            </span>
          </div>

          {/* Recipient */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid #161c2c', borderRadius: 14, padding: '14px 16px', gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img
                src={RECIPIENT.img} alt={RECIPIENT.name}
                style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{RECIPIENT.name}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{RECIPIENT.mask}</span>
              </div>
            </div>
            <img src={logoVisa} alt="Visa" style={{ height: 12, objectFit: 'contain', flexShrink: 0 }} />
          </div>

          {/* Note */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid #161c2c', borderRadius: 14, height: 50, padding: '0 16px',
          }}>
            <input
              type="text"
              className="dm-note"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Ajouter une note..."
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'Inter', fontSize: 14, color: '#FFFFFF',
              }}
            />
            <Calendar size={18} color="#737373" strokeWidth={1.5} />
          </div>
        </div>

        {/* NumPad + button — slides up from bottom */}
        <AnimatePresence>
          {showPad && (
            <motion.div
              key="dm-numpad"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                backgroundColor: '#0a0a0f',
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
                        flex: 1, height: 70, borderRadius: 14, backgroundColor: '#141830',
                        border: 'none', cursor: 'pointer',
                        fontFamily: 'Inter', fontSize: 24, color: '#FFFFFF',
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
                onClick={() => setShowRecap(true)}
                style={{
                  width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
                  border: 'none', cursor: 'pointer', marginTop: 4,
                  fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
                }}
              >
                Récapitulatif
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Blurry veil — full screen, outside inner sheet */}
      <AnimatePresence>
        {showRecap && (
          <>
            <motion.div
              key="dm-veil"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setShowRecap(false)}
              style={{
                position: 'absolute', inset: 0,
                backgroundColor: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                zIndex: 20,
              }}
            />
            <motion.div
              key="dm-recap"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                backgroundColor: '#0D1025',
                borderRadius: '24px 24px 0 0',
                padding: '12px 20px 32px',
                zIndex: 21,
                display: 'flex', flexDirection: 'column', gap: 20,
              }}
            >
              {/* Drag handle */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#3A3A5A' }} />
              </div>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
                  Récapitulatif
                </span>
                <button
                  onClick={() => setShowRecap(false)}
                  style={{
                    width: 32, height: 32, borderRadius: 16,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={16} color="#FFFFFF" strokeWidth={2} />
                </button>
              </div>

              <div style={{ height: 1, backgroundColor: '#1E2240' }} />

              {/* Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>Vous initiez une demande de</span>
                  <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
                    EUR {displayCents(cents)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>adressée à</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{RECIPIENT.name}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>avec comme note</span>
                  <div style={{
                    backgroundColor: '#141830', borderRadius: 12,
                    border: '1px solid #1E2240', padding: '12px 14px',
                    minHeight: 48,
                  }}>
                    <span style={{
                      fontFamily: 'Inter', fontSize: 14,
                      color: note.trim() ? '#FFFFFF' : '#4A4A6A',
                      lineHeight: 1.5,
                      fontStyle: note.trim() ? 'italic' : 'normal',
                    }}>
                      {note.trim() || 'Aucune note'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ height: 1, backgroundColor: '#1E2240' }} />

              <button
                onClick={() => navigate('/demande-succes')}
                style={{
                  width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
                  border: 'none', cursor: 'pointer',
                  fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
                }}
              >
                Valider la demande
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
