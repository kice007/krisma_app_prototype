import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const OTP_LENGTH = 6
const RESEND_DELAY = 30

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function ParentOtp() {
  const navigate = useNavigate()
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [focusedIndex, setFocusedIndex] = useState(null)
  const [countdown, setCountdown] = useState(RESEND_DELAY)
  const refs = useRef([])

  useEffect(() => {
    if (countdown <= 0) return
    const id = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  const handleChange = (i, val) => {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = digit
    setDigits(next)
    if (digit && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = [...digits]
    pasted.split('').forEach((ch, idx) => { next[idx] = ch })
    setDigits(next)
    refs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  const allFilled = digits.every(d => d !== '')

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
        style={{ top: 62, left: 0, right: 0, bottom: 0, padding: '20px 24px 40px 24px' }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <motion.button
            onClick={() => navigate('/parent-phone')}
            whileTap={{ scale: 0.93 }}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              backgroundColor: '#141830', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
          </motion.button>

          <span style={{
            fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
            color: '#4F46E5', letterSpacing: '0.07em', textTransform: 'uppercase',
          }}>
            ÉTAPE 1 SUR 4
          </span>
        </div>

        {/* Progress bar */}
        <motion.div className="flex" style={{ gap: 4, marginBottom: 32 }} {...fadeUp(0.05)}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 99,
              backgroundColor: i === 0 ? '#4F46E5' : '#2A2A4A',
            }} />
          ))}
        </motion.div>

        {/* Title */}
        <motion.div className="flex flex-col" style={{ gap: 8, marginBottom: 36 }} {...fadeUp(0.1)}>
          <span style={{
            fontFamily: '"Rethink Sans", sans-serif',
            fontSize: 28, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, display: 'block',
          }}>
            Code de vérification
          </span>
          <span style={{
            fontFamily: 'Inter', fontSize: 14, color: '#737373', lineHeight: 1.6, display: 'block',
          }}>
            Entrez le code à 6 chiffres envoyé par SMS au{' '}
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>+225 07 00 00 00 00</span>
          </span>
        </motion.div>

        {/* OTP boxes */}
        <motion.div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }} {...fadeUp(0.18)}>
          {digits.map((d, i) => {
            const isFocused = focusedIndex === i
            return (
              <input
                key={i}
                ref={el => { refs.current[i] = el }}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onPaste={handlePaste}
                onFocus={() => setFocusedIndex(i)}
                onBlur={() => setFocusedIndex(null)}
                style={{
                  width: 46, height: 56, flexShrink: 0, borderRadius: 12,
                  backgroundColor: '#141830',
                  border: `1.5px solid ${isFocused ? '#4F46E5' : d ? '#3A3A5A' : '#2A2A4A'}`,
                  outline: 'none',
                  fontFamily: '"Rethink Sans", sans-serif',
                  fontSize: 22, fontWeight: 700, textAlign: 'center',
                  color: isFocused ? '#4F46E5' : '#FFFFFF',
                  caretColor: '#4F46E5',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
              />
            )
          })}
        </motion.div>

        {/* Resend row */}
        <motion.div
          className="flex items-center justify-center"
          style={{ gap: 6, marginBottom: 'auto' }}
          {...fadeUp(0.24)}
        >
          <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#555577' }}>
            Vous n'avez pas reçu le code ?
          </span>
          {countdown > 0 ? (
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#555577' }}>{countdown}s</span>
          ) : (
            <button
              onClick={() => setCountdown(RESEND_DELAY)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#4F46E5',
              }}
            >
              Renvoyer
            </button>
          )}
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={() => navigate('/parent-info')}
          {...fadeUp(0.3)}
          whileTap={{ scale: 0.98 }}
          style={{
            backgroundColor: allFilled ? '#4F46E5' : '#1E2040',
            height: 56, borderRadius: 16,
            border: 'none', cursor: allFilled ? 'pointer' : 'default',
            fontFamily: 'Inter', fontSize: 15, fontWeight: 600,
            color: allFilled ? '#FFFFFF' : '#3A3A5A',
            width: '100%',
            transition: 'background-color 0.25s ease, color 0.25s ease',
          }}
        >
          Continuer
        </motion.button>
      </div>
    </motion.div>
  )
}
