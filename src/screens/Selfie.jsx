import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setStream } from '../utils/streamStore'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import { CameraIcon } from '../components/Icons'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function Selfie() {
  const navigate    = useNavigate()
  const [busy,    setBusy]    = useState(false)
  const [denied,  setDenied]  = useState(false)

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
        style={{ top: 62, left: 0, right: 0, bottom: 0, padding: '20px 24px 40px 24px', justifyContent: 'space-between' }}
      >
        {/* ── Top section ── */}
        <div className="flex flex-col" style={{ gap: 20 }}>

          {/* Back button */}
          <motion.button
            onClick={() => navigate('/id-doc')}
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

          {/* Progress bar — 4 of 4 filled */}
          <motion.div className="flex" style={{ gap: 4 }} {...fadeUp(0.05)}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, backgroundColor: '#4F46E5' }} />
            ))}
          </motion.div>

          {/* Step label */}
          <motion.span
            style={{
              fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
              color: '#4F46E5', letterSpacing: '0.07em', textTransform: 'uppercase',
            }}
            {...fadeUp(0.08)}
          >
            ÉTAPE 4 SUR 4
          </motion.span>

          {/* Title */}
          <motion.span
            style={{
              fontFamily: '"Rethink Sans", sans-serif',
              fontSize: 30, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, display: 'block',
            }}
            {...fadeUp(0.12)}
          >
            Selfie de vérification
          </motion.span>

          {/* Description */}
          <motion.p
            style={{
              fontFamily: 'Inter', fontSize: 13, fontWeight: 400,
              color: '#FFFFFF', lineHeight: 1.5, margin: 0,
            }}
            {...fadeUp(0.16)}
          >
            Placez votre visage dans le cadre et prenez un selfie pour confirmer votre identité.
          </motion.p>
        </div>

        {/* ── Camera area ── */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
          {...fadeUp(0.22)}
        >
          {/* Rings + circle wrapper — overflow hidden keeps pulse rings from touching text below */}
          <div style={{ position: 'relative', width: 260, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '50%' }}>

            {/* 2 staggered pulse rings — clean single-wave effect */}
            {[0, 1].map(i => (
              <span key={i} style={{
                position: 'absolute',
                width: 220, height: 220, borderRadius: '50%',
                border: '1px solid #4F46E5',
                animation: `pulse-ring 2.4s ease-out ${i * 1.2}s infinite`,
                pointerEvents: 'none',
              }} />
            ))}

            {/* Camera circle (from design: 220×220, cornerRadius 200 = full circle) */}
            <div
              style={{
                width: 220, height: 220, borderRadius: '50%',
                backgroundColor: '#141830',
                border: '2px solid rgba(79,70,229,0.25)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 12, position: 'relative', zIndex: 1, cursor: 'pointer',
              }}
            >
              <CameraIcon size={40} color="#818CF8" />
              <span style={{
                fontFamily: 'Inter', fontSize: 12, fontWeight: 400,
                color: '#555577', textAlign: 'center',
              }}>
                Appuyez pour activer
              </span>
            </div>
          </div>

          {/* Tip (from design) */}
          <p style={{
            fontFamily: 'Inter', fontSize: 12, fontWeight: 400,
            color: '#737373', textAlign: 'center', margin: 0,
          }}>
            Durée : 10 secondes · Bonne lumière recommandée
          </p>
        </motion.div>

        {/* ── CTA ── */}
        {denied && (
          <p style={{
            fontFamily: 'Inter', fontSize: 12, color: '#F87171',
            textAlign: 'center', margin: '0 0 8px',
          }}>
            Accès caméra refusé. Autorisez-le dans les réglages.
          </p>
        )}
        <motion.button
          onClick={async () => {
            if (busy) return
            setBusy(true)
            setDenied(false)
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true })
              setStream(stream)
              navigate('/selfie-scan')
            } catch {
              setBusy(false)
              setDenied(true)
            }
          }}
          {...fadeUp(0.32)}
          whileTap={{ scale: 0.98 }}
          style={{
            backgroundColor: busy ? '#3730A3' : '#4F46E5',
            height: 56, borderRadius: 16,
            border: 'none', cursor: busy ? 'default' : 'pointer',
            fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF',
            width: '100%',
            transition: 'background-color 0.2s ease',
            opacity: busy ? 0.75 : 1,
          }}
        >
          {busy ? 'Activation…' : 'Prendre le selfie'}
        </motion.button>
      </div>
    </motion.div>
  )
}
