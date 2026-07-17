import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/backless_purple.png'
import StatusBar from '../components/StatusBar'

const bgShapes = [
  { width: 304, height: 332, x: -53.69, y: -16,  fill: '#818cf808' },
  { width: 304, height: 332, x: 319.31, y: 519,  fill: '#818cf80d' },
  { width: 189, height: 184, x: 48,     y: 265,  fill: '#818cf808' },
  { width: 118, height: 111, x: 290.98, y: 89,   fill: '#818cf80d' },
]

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/welcome'), 2500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.4, ease: 'easeIn' } }}
    >
      {bgShapes.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: s.width, height: s.height,
            left: s.x, top: s.y,
            backgroundColor: s.fill,
            borderRadius: 33,
            transform: 'rotate(39.08deg)',
            transformOrigin: '0 0',
          }}
        />
      ))}

      <StatusBar />

      <motion.div
        className="absolute flex flex-col items-center justify-center"
        style={{ top: 62, left: 0, right: 0, bottom: 0, gap: 16, zIndex: 10 }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      >
        <div style={{ width: 176, height: 165, borderRadius: 22, overflow: 'hidden' }}>
          <img src={logo} alt="Krisma logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 38, fontWeight: 700, color: '#FFFFFF' }}>
          Krisma
        </span>
      </motion.div>
    </motion.div>
  )
}
