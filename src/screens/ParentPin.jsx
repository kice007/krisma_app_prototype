import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Delete } from 'lucide-react'
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
        const color = error ? '#EF4444' : filled ? '#4F46E5' : '#2A2A4A'
        return (
          <motion.div
            key={i}
            animate={{ scale: filled && !error ? [1, 1.25, 1] : 1, backgroundColor: color }}
            transition={{ duration: 0.18 }}
            style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: color }}
          />
        )
      })}
    </div>
  )
}

export default function ParentPin() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(1)          // 1 = create, 2 = confirm
  const [firstPin, setFirstPin] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleKey = useCallback((key) => {
    if (error) {
      setError(false)
      setPin('')
      return
    }
    if (key === 'DEL') {
      setPin(p => p.slice(0, -1))
      return
    }
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
          navigate('/parent-connexion')
        } else {
          setError(true)
          setShake(true)
          setTimeout(() => {
            setShake(false)
            setError(false)
            setPin('')
          }, 700)
        }
      }
    } else {
      setPin(next)
    }
  }, [pin, phase, firstPin, error, navigate])

  const title = phase === 1 ? 'Créez votre code PIN' : 'Confirmez votre PIN'
  const subtitle = phase === 1
    ? 'Choisissez un code PIN à 4 chiffres pour sécuriser vos transferts.'
    : 'Ressaisissez votre code PIN pour confirmer.'

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.22 } }}
    >
      <StatusBar />

      <div
        className="absolute flex flex-col"
        style={{
          top: 62, left: 0, right: 0, bottom: 0,
          padding: '32px 24px 40px 24px',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Top: title + subtitle + dots ── */}
        <div className="flex flex-col" style={{ gap: 20, alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              style={{
                fontFamily: '"Rethink Sans", sans-serif',
                fontSize: 30, fontWeight: 800, color: '#FFFFFF',
                textAlign: 'center', display: 'block', width: '100%',
              }}
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
              style={{
                fontFamily: 'Inter', fontSize: 14, color: '#737373',
                lineHeight: 1.5, textAlign: 'center', display: 'block', width: '100%',
              }}
            >
              {subtitle}
            </motion.span>
          </AnimatePresence>

          <motion.div
            animate={shake ? { x: [-8, 8, -8, 8, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PinDots pin={pin} error={error} />
          </motion.div>

          {error && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: 'Inter', fontSize: 13, color: '#EF4444',
                textAlign: 'center', marginTop: -8,
              }}
            >
              Codes différents — réessayez
            </motion.span>
          )}
        </div>

        {/* ── Numpad ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ROWS.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 10 }}>
              {row.map(key => {
                const isEmpty = key === '*'
                const isDel = key === 'DEL'
                return (
                  <motion.button
                    key={key}
                    onTouchStart={() => !isEmpty && handleKey(key)}
                    onClick={() => !isEmpty && handleKey(key)}
                    whileTap={!isEmpty ? { scale: 0.92, backgroundColor: '#1E2040' } : {}}
                    style={{
                      flex: 1, height: 64, borderRadius: 14,
                      backgroundColor: '#141830',
                      border: '1px solid #2A2A4A',
                      cursor: isEmpty ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: isEmpty ? 0.3 : 1,
                    }}
                  >
                    {isDel ? (
                      <Delete size={22} color="#FFFFFF" strokeWidth={2} />
                    ) : !isEmpty ? (
                      <span style={{
                        fontFamily: '"Rethink Sans", sans-serif',
                        fontSize: 24, fontWeight: 700, color: '#FFFFFF',
                        userSelect: 'none',
                      }}>
                        {key}
                      </span>
                    ) : null}
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
