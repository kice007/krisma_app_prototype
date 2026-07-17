import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, MessageSquare } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const OTP_LENGTH = 6
const EXPIRY_SECONDS = 120

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function ParentForgotPinVerify() {
  const navigate = useNavigate()
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [focusedIndex, setFocusedIndex] = useState(null)
  const [timer, setTimer] = useState(EXPIRY_SECONDS)
  const refs = useRef([])

  useEffect(() => {
    if (timer <= 0) return
    const id = setTimeout(() => setTimer(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timer])

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

      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', padding: '20px 24px 40px',
      }}>
        <motion.button
          onClick={() => navigate('/parent-forgot-pin')}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 40, height: 40, borderRadius: '50%', backgroundColor: '#141830',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 32, flexShrink: 0,
          }}
        >
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </motion.button>

        <motion.div {...fadeUp(0.05)} style={{
          width: 64, height: 64, borderRadius: '50%',
          backgroundColor: 'rgba(79,70,229,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24, alignSelf: 'center',
        }}>
          <MessageSquare size={26} color="#4F46E5" strokeWidth={1.5} />
        </motion.div>

        <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 26, fontWeight: 800, color: '#FFFFFF', textAlign: 'center' }}>
            Code de vérification
          </span>
          <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373', lineHeight: 1.6, textAlign: 'center' }}>
            Entrez le code à 6 chiffres envoyé par SMS au{' '}
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>+225 07 07 07 07</span>
            . Valable 10 minutes.
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.15)} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
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
                  width: 46, height: 56, borderRadius: 12,
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

        <motion.div {...fadeUp(0.2)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 'auto',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#555577' }}>
            Le code expire dans{' '}
            <span style={{ color: timer > 10 ? '#FFFFFF' : '#EF4444', fontWeight: 500 }}>
              {formatTime(timer)}
            </span>
          </span>
          <button
            onClick={() => setTimer(EXPIRY_SECONDS)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
              color: timer <= 0 ? '#4F46E5' : '#555577',
            }}
          >
            Renvoyer
          </button>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <motion.button
            onClick={() => allFilled && navigate('/parent-new-pin')}
            {...fadeUp(0.25)}
            whileTap={allFilled ? { scale: 0.98 } : {}}
            style={{
              height: 56, borderRadius: 16,
              backgroundColor: allFilled ? '#4F46E5' : '#1E2040', border: 'none',
              cursor: allFilled ? 'pointer' : 'default',
              fontFamily: 'Inter', fontSize: 15, fontWeight: 600,
              color: allFilled ? '#FFFFFF' : '#3A3A5A',
              width: '100%',
              transition: 'background-color 0.25s ease, color 0.25s ease',
            }}
          >
            Valider le code
          </motion.button>

          <button
            onClick={() => navigate('/parent-connexion')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, color: '#555577', textAlign: 'center',
            }}
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </motion.div>
  )
}
