import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, KeyRound, ShieldCheck, Delete } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', 'DEL'],
]

function PinDots({ pin, error }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      {[0, 1, 2, 3].map(i => {
        const filled = i < pin.length
        const bg = error ? '#EF4444' : filled ? '#4F46E5' : '#FFFFFF'
        const border = error ? '#EF4444' : filled ? '#4F46E5' : '#DDDDE8'
        return (
          <motion.div
            key={i}
            animate={{ scale: filled && !error ? [1, 1.25, 1] : 1, backgroundColor: bg }}
            transition={{ duration: 0.18 }}
            style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: bg, border: `1.5px solid ${border}` }}
          />
        )
      })}
    </div>
  )
}

export default function ParentNewPinLight() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(1)
  const [firstPin, setFirstPin] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleKey = useCallback((key) => {
    if (error) { setError(false); setPin(''); return }
    if (key === 'DEL') { setPin(p => p.slice(0, -1)); return }
    if (key === '*') return
    if (pin.length >= 4) return
    const next = pin + key
    if (next.length === 4) {
      if (phase === 1) {
        setFirstPin(next)
        setPin('')
        setPhase(2)
      } else {
        if (next === firstPin) {
          navigate('/parent-pin-reset-light')
        } else {
          setError(true)
          setShake(true)
          setTimeout(() => { setShake(false); setError(false); setPin('') }, 700)
        }
      }
    } else {
      setPin(next)
    }
  }, [pin, phase, firstPin, error, navigate])

  const handleBack = () => {
    if (phase === 2) { setPhase(1); setPin(''); setFirstPin('') }
    else navigate('/parent-forgot-pin-verify-light')
  }

  const phase1 = phase === 1
  const title = phase1 ? 'Nouveau code PIN' : 'Confirmez votre PIN'
  const subtitle = phase1
    ? "Choisissez un code à 4 chiffres pour sécuriser l'accès à votre compte."
    : 'Saisissez à nouveau votre code à 4 chiffres pour confirmer.'
  const dotHint = `${pin.length} chiffre${pin.length !== 1 ? 's' : ''} sur 4 saisie${pin.length !== 1 ? 's' : ''}`

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.22 } }}
    >
      <StatusBar color="#0A0A0F" />

      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', padding: '20px 24px 40px',
        justifyContent: 'space-between',
      }}>
        <motion.button
          onClick={handleBack}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 40, height: 40, borderRadius: '50%', backgroundColor: '#F4F4F8',
            border: '1px solid #DDDDE8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronLeft size={20} color="#1A1A2E" strokeWidth={2} />
        </motion.button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              style={{
                width: 64, height: 64, borderRadius: '50%',
                backgroundColor: 'rgba(79,70,229,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {phase1
                ? <KeyRound size={26} color="#4F46E5" strokeWidth={1.5} />
                : <ShieldCheck size={26} color="#4F46E5" strokeWidth={1.5} />
              }
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.span
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 28, fontWeight: 800, color: '#1A1A2E', textAlign: 'center', display: 'block' }}
            >
              {title}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.span
              key={subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.05 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373', lineHeight: 1.5, textAlign: 'center', display: 'block' }}
            >
              {subtitle}
            </motion.span>
          </AnimatePresence>

          <motion.div animate={shake ? { x: [-8, 8, -8, 8, -4, 4, 0] } : { x: 0 }} transition={{ duration: 0.5 }}>
            <PinDots pin={pin} error={error} />
          </motion.div>

          <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#A0A0B8' }}>{dotHint}</span>

          {error && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontFamily: 'Inter', fontSize: 13, color: '#EF4444', textAlign: 'center' }}>
              Codes différents — réessayez
            </motion.span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ROWS.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 10 }}>
              {row.map(key => {
                const isEmpty = key === '*'
                const isDel = key === 'DEL'
                return (
                  <motion.button
                    key={key}
                    onClick={() => !isEmpty && handleKey(key)}
                    whileTap={!isEmpty ? { scale: 0.92, backgroundColor: '#E0E0EC' } : {}}
                    style={{
                      flex: 1, height: 64, borderRadius: 14,
                      backgroundColor: '#F4F4F8', border: '1px solid #DDDDE8',
                      cursor: isEmpty ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: isEmpty ? 0 : 1,
                    }}
                  >
                    {isDel
                      ? <Delete size={22} color="#1A1A2E" strokeWidth={2} />
                      : !isEmpty
                        ? <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 24, fontWeight: 700, color: '#1A1A2E', userSelect: 'none' }}>{key}</span>
                        : null}
                  </motion.button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
