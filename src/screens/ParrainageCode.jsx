import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Gift } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function ParrainageCode() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [focused, setFocused] = useState(false)

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
    setCode(val)
  }

  const isValid = code.length === 6

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.22 } }}
    >
      <style>{`.prc-input::placeholder { color: #3A3A5A; }`}</style>
      <StatusBar />

      <div
        className="absolute flex flex-col"
        style={{ top: 62, left: 0, right: 0, bottom: 0, padding: '20px 24px 40px 24px', justifyContent: 'space-between' }}
      >
        {/* ── Top ── */}
        <div className="flex flex-col" style={{ gap: 24 }}>

          {/* Back */}
          <motion.button
            onClick={() => navigate(-1)}
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

          {/* Invite card */}
          <motion.div
            {...fadeUp(0.06)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: 'linear-gradient(180deg, #141830 0%, #1a1a3a 100%)',
              border: '1px solid #2A2A4A',
              borderRadius: 16,
              padding: '16px 18px',
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 48, height: 48, borderRadius: 24,
              backgroundColor: '#4F46E5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>KE</span>
            </div>

            {/* Info */}
            <div className="flex flex-col" style={{ gap: 3, flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Invité par</span>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
                Konan Étudiant
              </span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#818CF8' }}>Rejoignez-le sur Krisma</span>
            </div>

            {/* Gift badge */}
            <div style={{
              width: 40, height: 40, borderRadius: 20,
              backgroundColor: 'rgba(79,70,229,0.10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Gift size={18} color="#4F46E5" strokeWidth={1.8} />
            </div>
          </motion.div>

          {/* Title block */}
          <motion.div className="flex flex-col" style={{ gap: 10 }} {...fadeUp(0.12)}>
            <span style={{
              fontFamily: '"Rethink Sans", sans-serif',
              fontSize: 30, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, display: 'block',
            }}>
              Code de parrainage
            </span>
            <span style={{
              fontFamily: 'Inter', fontSize: 14, color: '#9494B8',
              lineHeight: 1.6, display: 'block',
            }}>
              Saisissez le code envoyé par votre enfant pour lier vos comptes et profiter des transferts simplifiés.
            </span>
          </motion.div>

          {/* Code section */}
          <motion.div className="flex flex-col" style={{ gap: 8 }} {...fadeUp(0.18)}>
            <span style={{
              fontFamily: 'Inter', fontSize: 12, fontWeight: 600,
              color: '#737373', letterSpacing: 0.4,
            }}>
              Votre code d'invitation
            </span>

            {/* Code input row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              height: 64, borderRadius: 14,
              backgroundColor: '#141830',
              border: `1.5px solid ${focused ? '#4F46E5' : isValid ? '#4F46E5' : '#2A2A4A'}`,
              padding: '0 18px',
              transition: 'border-color 0.2s ease',
            }}>
              <span style={{
                fontFamily: '"Rethink Sans", sans-serif',
                fontSize: 20, fontWeight: 700, color: '#818CF8',
                flexShrink: 0,
              }}>
                KRIS-
              </span>
              <div style={{ width: 1, height: 26, backgroundColor: '#2A2A4A', flexShrink: 0 }} />
              <input
                className="prc-input"
                value={code}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="4F7X3K"
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  fontFamily: '"Rethink Sans", sans-serif',
                  fontSize: 20, fontWeight: 700,
                  color: '#FFFFFF',
                  caretColor: '#4F46E5',
                  letterSpacing: 2,
                }}
              />
            </div>

            <span style={{
              fontFamily: 'Inter', fontSize: 12, color: '#737373', lineHeight: 1.4,
            }}>
              Ce code se trouve dans le message WhatsApp de votre enfant.
            </span>
          </motion.div>
        </div>

        {/* ── CTA ── */}
        <motion.button
          onClick={() => { if (isValid) navigate('/parent-phone') }}
          {...fadeUp(0.28)}
          whileTap={isValid ? { scale: 0.98 } : {}}
          style={{
            backgroundColor: isValid ? '#4F46E5' : '#1E2040',
            height: 56, borderRadius: 16,
            border: 'none', cursor: isValid ? 'pointer' : 'default',
            fontFamily: 'Inter', fontSize: 15, fontWeight: 600,
            color: isValid ? '#FFFFFF' : '#3A3A5A',
            width: '100%',
            transition: 'background-color 0.25s ease, color 0.25s ease',
          }}
        >
          Valider le code
        </motion.button>
      </div>
    </motion.div>
  )
}
