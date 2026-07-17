import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const DOC_TYPES = ['Passeport', 'Carte de séjour', 'Titre de séjour']

// Vuesax linear/export icon
// Paths from Pencil geometry, scaled by 1.458 and offset by bbox (x,y) into a 35×35 canvas
function ExportIcon({ color = '#818CF8', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 35 35" fill="none">
      {/* Tray — open at top-center where the shaft exits */}
      <path
        d="M23.971 12.608c5.249 0.452 7.392 3.149 7.392 9.058l0 0.19c0 6.517-2.61 9.127-9.127 9.127l-9.492 0c-6.517 0-9.127-2.61-9.127-9.127l0-0.19c0-5.861 2.114-8.558 7.276-9.044"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Arrow shaft */}
      <path
        d="M17.5 21.72l0-16.592"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Arrowhead */}
      <path
        d="M22.384 8.426l-4.884-4.884-4.884 4.884"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function IdDoc() {
  const navigate   = useNavigate()
  const [docType, setDocType] = useState('Passeport')
  const [file,    setFile]    = useState(null)
  const fileRef = useRef(null)

  const handleFile = (e) => { if (e.target.files[0]) setFile(e.target.files[0]) }

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
            onClick={() => navigate('/info')}
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

          {/* Progress bar — 3 of 4 filled */}
          <motion.div className="flex" style={{ gap: 4 }} {...fadeUp(0.05)}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                flex: 1, height: 3, borderRadius: 99,
                backgroundColor: i < 3 ? '#4F46E5' : '#2A2A4A',
              }} />
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
            ÉTAPE 3 SUR 4
          </motion.span>

          {/* Title */}
          <motion.span
            style={{
              fontFamily: '"Rethink Sans", sans-serif',
              fontSize: 30, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, display: 'block',
            }}
            {...fadeUp(0.12)}
          >
            Document d'identité
          </motion.span>

          {/* Form */}
          <motion.div className="flex flex-col" style={{ gap: 16 }} {...fadeUp(0.18)}>

            {/* Description */}
            <p style={{
              fontFamily: 'Inter', fontSize: 13, fontWeight: 400,
              color: '#FFFFFF', lineHeight: 1.5, margin: 0,
            }}>
              Téléchargez votre passeport ou carte de séjour en cours de validité.
            </p>

            {/* Upload area */}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 12,
                backgroundColor: '#141830',
                border: '1px solid #2A2A4A',
                borderRadius: 16,
                padding: '32px 20px',
                cursor: 'pointer', width: '100%',
              }}
            >
              {/* Icon box */}
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {file
                  ? <span style={{ fontSize: 28 }}>📄</span>
                  : <ExportIcon color="#818CF8" size={35} />
                }
              </div>

              <span style={{
                fontFamily: '"Rethink Sans", sans-serif',
                fontSize: 14, fontWeight: 700, color: '#FFFFFF',
              }}>
                {file ? file.name : 'Appuyez pour télécharger'}
              </span>

              <span style={{
                fontFamily: 'Inter', fontSize: 12, fontWeight: 400, color: '#555577',
              }}>
                JPG / PNG · max 10 Mo
              </span>
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              style={{ display: 'none' }}
              onChange={handleFile}
            />

            {/* Document type chips */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {DOC_TYPES.map(t => {
                const active = t === docType
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setDocType(t)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      border: active ? 'none' : '0.5px solid #2A2A4A',
                      backgroundColor: active ? '#4F46E5' : 'transparent',
                      cursor: 'pointer',
                      fontFamily: 'Inter',
                      fontSize: 11,
                      fontWeight: active ? 600 : 400,
                      color: active ? '#FFFFFF' : '#9999BB',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>

          </motion.div>
        </div>

        {/* ── CTA ── */}
        <motion.button
          onClick={() => navigate('/selfie')}
          {...fadeUp(0.3)}
          whileTap={{ scale: 0.98 }}
          style={{
            backgroundColor: '#4F46E5', height: 56, borderRadius: 16,
            border: 'none', cursor: 'pointer',
            fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF',
            width: '100%',
          }}
        >
          Continuer
        </motion.button>
      </div>
    </motion.div>
  )
}
