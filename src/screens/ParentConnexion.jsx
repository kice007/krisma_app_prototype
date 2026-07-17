import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Delete } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import logo from '../assets/logo_welcome.png'

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
        const bg = error ? '#EF4444' : filled ? '#4F46E5' : '#ffffff'
        const border = error ? '#EF4444' : filled ? '#4F46E5' : '#2A2A4A'
        return (
          <motion.div
            key={i}
            animate={{ scale: filled && !error ? [1, 1.25, 1] : 1, backgroundColor: bg }}
            transition={{ duration: 0.18 }}
            style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: bg, border: `1px solid ${border}` }}
          />
        )
      })}
    </div>
  )
}

export default function ParentConnexion() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleKey = useCallback((key) => {
    if (error) { setError(false); setPin(''); return }
    if (key === 'DEL') { setPin(p => p.slice(0, -1)); return }
    if (key === '*') return
    if (pin.length >= 4) return
    const next = pin + key
    setPin(next)
    if (next.length === 4) {
      setTimeout(() => navigate('/parent-dashboard'), 300)
    }
  }, [pin, error, navigate])

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {/* Radial glow */}
      <div style={{
        position: 'absolute', left: -297, top: -363,
        width: 1020, height: 921, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.80) 0%, rgba(79,70,229,0) 70%)',
        filter: 'blur(50px)', pointerEvents: 'none',
      }} />

      <StatusBar />

      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        alignItems: 'center', padding: '36px 24px 40px',
      }}>

        {/* Top: logo + title + phone */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
          <motion.img
            src={logo} alt="Krisma"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
            style={{ width: 80, height: 80, borderRadius: 20, objectFit: 'cover' }}
          />
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.08 } }}
            style={{
              fontFamily: '"Rethink Sans", sans-serif',
              fontSize: 30, fontWeight: 800, color: '#FFFFFF', textAlign: 'center',
            }}
          >
            Bon retour
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.14 } }}
            style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.75)', textAlign: 'center' }}
          >
            +225 07 07 07 07&nbsp;&nbsp;·&nbsp;&nbsp;
            <span onClick={() => navigate(-1)} style={{ color: '#818CF8', cursor: 'pointer' }}>
              Modifier
            </span>
          </motion.span>
        </div>

        {/* PIN hint + dots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', width: '100%' }}>
          <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.75)', textAlign: 'center' }}>
            Entrez votre code PIN
          </span>
          <motion.div
            animate={shake ? { x: [-8, 8, -8, 8, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PinDots pin={pin} error={error} />
          </motion.div>
        </div>

        {/* Numpad */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          {ROWS.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 10 }}>
              {row.map(key => {
                const isEmpty = key === '*'
                const isDel = key === 'DEL'
                return (
                  <motion.button
                    key={key}
                    onClick={() => !isEmpty && handleKey(key)}
                    whileTap={!isEmpty ? { scale: 0.92, backgroundColor: '#1E2040' } : {}}
                    style={{
                      flex: 1, height: 64, borderRadius: 14,
                      backgroundColor: '#141830', border: '1px solid #2A2A4A',
                      cursor: isEmpty ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: isEmpty ? 0 : 1,
                    }}
                  >
                    {isDel ? (
                      <Delete size={22} color="#FFFFFF" strokeWidth={2} />
                    ) : !isEmpty ? (
                      <span style={{
                        fontFamily: '"Rethink Sans", sans-serif',
                        fontSize: 24, fontWeight: 700, color: '#FFFFFF', userSelect: 'none',
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

        {/* Forgot PIN */}
        <span
          onClick={() => navigate('/parent-forgot-pin')}
          style={{ fontFamily: 'Inter', fontSize: 13, color: '#818CF8', textAlign: 'center', cursor: 'pointer' }}
        >
          Mot de passe oublié ?
        </span>
      </div>
    </motion.div>
  )
}
