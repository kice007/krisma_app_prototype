import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '../components/StatusBar'

export default function ParentSelfieSuccess() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const screenshot = state?.screenshot

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#111118' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {screenshot ? (
        <img
          src={screenshot}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)',
          }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, #1A1A2E, #0D0D1A)',
        }} />
      )}

      <div style={{
        position: 'absolute', inset: 0,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0,0,0,0.30)',
        pointerEvents: 'none',
      }} />

      <StatusBar />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }}
        style={{
          position: 'absolute',
          left: 32, top: 200,
          width: 326,
          backgroundColor: '#0A0A0F',
          borderRadius: 32,
          boxShadow: '0px 20px 60px rgba(0,0,0,0.38)',
          padding: '36px 28px 40px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 16,
        }}
      >
        <span style={{
          fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
          color: '#737373', letterSpacing: 1.5,
          textAlign: 'center',
        }}>
          RECONNAISSANCE FACIALE
        </span>

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] } }}
          style={{ position: 'relative', width: 200, height: 200, flexShrink: 0 }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            backgroundColor: 'rgba(79,70,229,0.08)',
          }} />
          <div style={{
            position: 'absolute', top: 30, left: 30,
            width: 140, height: 140,
            borderRadius: '50%',
            backgroundColor: 'rgba(79,70,229,0.15)',
          }} />
          <div style={{
            position: 'absolute', top: 65, left: 65,
            width: 70, height: 70,
            borderRadius: '50%',
            backgroundColor: '#4F46E5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.32, duration: 0.4 } }}
          style={{
            fontFamily: '"Rethink Sans", sans-serif',
            fontSize: 36, fontWeight: 800, color: '#F3F3F3',
            textAlign: 'center',
          }}
        >
          Succès !
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.42, duration: 0.4 } }}
          style={{
            fontFamily: 'Inter', fontSize: 14, fontWeight: 400,
            color: '#FFFFFF', textAlign: 'center', lineHeight: 1.5,
            width: 240, whiteSpace: 'pre-line',
          }}
        >
          {`Veuillez patienter, nous préparons\nvotre compte.`}
        </motion.span>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.48, duration: 0.4 } }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/parent-pin')}
        style={{
          position: 'absolute',
          left: 20, top: 756,
          width: 350, height: 52,
          borderRadius: 14,
          backgroundColor: '#4F46E5',
          border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF',
        }}
      >
        Continuer
      </motion.button>
    </motion.div>
  )
}
