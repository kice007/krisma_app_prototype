import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Shield } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const EUR_TO_XOF = 655.957
const FEE_RATE = 0.025

const PAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '←'],
]

function fmtAmount(cents) {
  const euros = Math.floor(cents / 100)
  const c = cents % 100
  const eurosStr = euros === 0 ? '00' : euros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${eurosStr}.${c.toString().padStart(2, '0')}`
}

function fmtXOF(cents) {
  return Math.round((cents / 100) * EUR_TO_XOF).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function fmtFee(cents) {
  return ((cents / 100) * FEE_RATE).toFixed(2).replace('.', ',')
}

export default function ParentEnvoyerMontant() {
  const navigate = useNavigate()
  const location = useLocation()
  const recipient = location.state?.recipient
  const [cents, setCents] = useState(0)
  const [showPad, setShowPad] = useState(false)

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
        @keyframes pemBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .pem-cursor { animation: pemBlink 1s step-end infinite; user-select:none; }
      `}</style>
      <StatusBar />

      {/* Purple header */}
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div onClick={() => navigate('/parent-envoyer-beneficiaire')} style={{
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
        backgroundColor: '#0A0A0F', borderRadius: '28px 28px 0 0', overflow: 'hidden',
      }}>
        {/* Static content */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 20 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.2)' }} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>Entrer le montant</span>
          </div>

          {/* Amount — tap to show numpad */}
          <div
            onClick={() => setShowPad(p => !p)}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 2, marginBottom: 14, cursor: 'pointer' }}
          >
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 44, fontWeight: 800, color: '#FFFFFF' }}>
              EUR {fmtAmount(cents)}
            </span>
            <span className="pem-cursor" style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 44, fontWeight: 200, color: '#FFFFFF' }}>|</span>
          </div>

          {/* Live XOF conversion */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 500, color: '#818CF8' }}>
              = {fmtXOF(cents)} FCFA
            </span>
          </div>

          {/* Fee */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#555577' }}>
              Frais Krisma {cents > 0 ? `EUR ${fmtFee(cents)} ` : ''}(2,5%)
            </span>
          </div>
        </div>

        {/* NumPad + CTA — slides up from bottom */}
        <AnimatePresence>
          {showPad && (
            <motion.div
              key="numpad"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                backgroundColor: '#0A0A0F',
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
                      {k === '*' ? '' : k}
                    </button>
                  ))}
                </div>
              ))}
              <button
                onClick={() => navigate('/parent-mode-paiement', { state: { cents } })}
                style={{
                  width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
                  border: 'none', cursor: 'pointer', marginTop: 4,
                  fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
                }}
              >
                Continuer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
