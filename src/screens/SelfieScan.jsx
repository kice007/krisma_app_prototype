import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStream, stopStream } from '../utils/streamStore'
import { motion } from 'framer-motion'
import StatusBar from '../components/StatusBar'

function Corner({ path, x, y }) {
  return (
    <svg
      width={32} height={32}
      viewBox="0 0 32 32"
      fill="none"
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    >
      <path
        d={path}
        stroke="#4F46E5"
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Pace of the scan counter: base cadence + a dwell (slow-down) centred on ~40%,
// so it lingers there for a moment before picking the pace back up.
function scanDelay(pct) {
  const base = 34
  const dwell = 210 * Math.exp(-Math.pow((pct - 40) / 3.2, 2))
  return base + dwell
}

export default function SelfieScan() {
  const navigate  = useNavigate()
  const videoRef  = useRef(null)
  const [progress, setProgress] = useState(0)
  const [camError, setCamError] = useState(false)

  useEffect(() => {
    const attach = async () => {
      let stream = getStream()
      if (!stream) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true })
        } catch {
          setCamError(true)
          return
        }
      }
      const video = videoRef.current
      if (!video) return
      video.srcObject = stream
      video.play().catch(() => {})
    }
    attach()
    return () => stopStream()
  }, [])

  // Progress 0 → 100 at an eased pace (slower, with a slow-down around 40%),
  // then capture frame and navigate.
  useEffect(() => {
    let pct = 0
    let timer
    const captureAndGo = () => {
      const video = videoRef.current
      let screenshot = null
      if (video && video.readyState >= 2) {
        const canvas = document.createElement('canvas')
        canvas.width  = video.videoWidth  || 390
        canvas.height = video.videoHeight || 844
        canvas.getContext('2d').drawImage(video, 0, 0)
        screenshot = canvas.toDataURL('image/jpeg', 0.85)
      }
      navigate('/selfie-success', { state: { screenshot } })
    }
    const step = () => {
      pct += 1
      setProgress(pct)
      if (pct >= 100) { captureAndGo(); return }
      timer = setTimeout(step, scanDelay(pct))
    }
    timer = setTimeout(step, scanDelay(0))
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#111118' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {/* ── Live camera feed ── */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transform: 'scaleX(-1)',
        }}
      />

      {/* Dark gradient at bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.72) 100%)',
        pointerEvents: 'none',
      }} />

      <StatusBar />

      <Corner path="M0 32 L0 0 L32 0"   x={55}  y={205} />
      <Corner path="M0 0 L32 0 L32 32"  x={303} y={205} />
      <Corner path="M0 0 L0 32 L32 32"  x={55}  y={514} />
      <Corner path="M0 32 L32 32 L32 0" x={303} y={514} />

      {/* ── Progress counter ── */}
      <div style={{
        position: 'absolute',
        left: 0, top: 654,
        width: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 6,
      }}>
        <span style={{
          fontFamily: '"Rethink Sans", sans-serif',
          fontSize: 52, fontWeight: 800, color: '#FFFFFF', lineHeight: 1,
        }}>
          {progress}%
        </span>
        <span style={{
          fontFamily: 'Inter', fontSize: 14, fontWeight: 400,
          color: 'rgba(255,255,255,0.73)',
        }}>
          Analyse du visage en cours…
        </span>
      </div>

      {/* ── Camera error fallback ── */}
      {camError && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 12,
          background: '#111118',
        }}>
          <span style={{ fontSize: 40 }}>📷</span>
          <span style={{
            fontFamily: 'Inter', fontSize: 14, color: '#F87171', textAlign: 'center',
            padding: '0 32px',
          }}>
            Accès caméra refusé. Autorisez-le dans les réglages de votre navigateur.
          </span>
          <button
            onClick={() => navigate('/selfie')}
            style={{
              marginTop: 8, padding: '10px 24px', borderRadius: 12,
              backgroundColor: '#4F46E5', border: 'none',
              fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#FFF',
              cursor: 'pointer',
            }}
          >
            Retour
          </button>
        </div>
      )}
    </motion.div>
  )
}
