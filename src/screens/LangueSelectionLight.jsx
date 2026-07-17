import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '../components/StatusBar'
import imgBritish from '../assets/british.png'
import imgSaudi from '../assets/saudi.png'
import imgEspagne from '../assets/espagne.png'

function ChevronLeft({ color = '#0a0a0f', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function FrenchFlag() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', display: 'flex', flexShrink: 0 }}>
      <div style={{ width: 13, height: 40, backgroundColor: '#002395' }} />
      <div style={{ width: 14, height: 40, backgroundColor: '#FFFFFF' }} />
      <div style={{ width: 13, height: 40, backgroundColor: '#ED2939' }} />
    </div>
  )
}

const LANGUAGES = [
  {
    id: 'fr',
    name: 'Français',
    native: 'Français',
    flag: <FrenchFlag />,
  },
  {
    id: 'en',
    name: 'English',
    native: 'English',
    flag: <img src={imgBritish} alt="English" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />,
  },
  {
    id: 'ar',
    name: 'Arabe',
    native: 'العربية',
    flag: <img src={imgSaudi} alt="Arabic" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />,
  },
  {
    id: 'es',
    name: 'Espagnol',
    native: 'Español',
    flag: <img src={imgEspagne} alt="Español" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />,
  },
]

export default function LangueSelectionLight() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('fr')

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#F7F8FF' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar color="#1A1A2E" />

      {/* SubHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', zIndex: 9,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 40, height: 40, borderRadius: 50, backgroundColor: '#EAEAF2',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronLeft color="#0a0a0f" size={20} />
        </button>
        <span style={{ fontFamily: 'Rethink Sans', fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>
          Langue
        </span>
        <div style={{ width: 36, height: 36 }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '24px 20px 32px 20px',
      }}>
        {/* Intro */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontFamily: 'Rethink Sans', fontSize: 24, fontWeight: 800, color: '#1A1A2E' }}>
            Choisissez votre langue
          </span>
          <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#737373' }}>
            L'application sera affichée dans la langue sélectionnée.
          </span>
        </div>

        {/* Language list */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          height: 392,
        }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => setSelected(lang.id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 20px',
                borderRadius: 14,
                border: '1px solid #DDDDE8',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {/* Left: flag + info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {lang.flag}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: selected === lang.id ? 600 : 400, color: '#1A1A2E' }}>
                    {lang.name}
                  </span>
                  <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 400, color: '#737373' }}>
                    {lang.native}
                  </span>
                </div>
              </div>
              {/* Right: check or radio */}
              {selected === lang.id ? (
                <div style={{
                  width: 24, height: 24, borderRadius: 12, backgroundColor: '#4F46E5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <path stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              ) : (
                <div style={{
                  width: 24, height: 24, borderRadius: 12,
                  border: '2px solid #1E1E2E', backgroundColor: 'transparent', flexShrink: 0,
                }} />
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button style={{
          width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'Rethink Sans', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
            Confirmer la langue
          </span>
        </button>
      </div>
    </motion.div>
  )
}
