import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const COUNTRIES = [
  { code: 'CI', flag: '🇨🇮', name: "Côte d'Ivoire", dial: '+225' },
  { code: 'SN', flag: '🇸🇳', name: 'Sénégal',       dial: '+221' },
  { code: 'CM', flag: '🇨🇲', name: 'Cameroun',       dial: '+237' },
  { code: 'ML', flag: '🇲🇱', name: 'Mali',           dial: '+223' },
  { code: 'BF', flag: '🇧🇫', name: 'Burkina Faso',   dial: '+226' },
  { code: 'TG', flag: '🇹🇬', name: 'Togo',           dial: '+228' },
  { code: 'GN', flag: '🇬🇳', name: 'Guinée',         dial: '+224' },
  { code: 'GA', flag: '🇬🇦', name: 'Gabon',          dial: '+241' },
  { code: 'CG', flag: '🇨🇬', name: 'Congo',          dial: '+242' },
  { code: 'MA', flag: '🇲🇦', name: 'Maroc',          dial: '+212' },
  { code: 'DZ', flag: '🇩🇿', name: 'Algérie',        dial: '+213' },
  { code: 'TN', flag: '🇹🇳', name: 'Tunisie',        dial: '+216' },
  { code: 'FR', flag: '🇫🇷', name: 'France',         dial: '+33'  },
  { code: 'BE', flag: '🇧🇪', name: 'Belgique',       dial: '+32'  },
  { code: 'CH', flag: '🇨🇭', name: 'Suisse',         dial: '+41'  },
  { code: 'CA', flag: '🇨🇦', name: 'Canada',         dial: '+1'   },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function Phone() {
  const navigate = useNavigate()
  const [country, setCountry] = useState(COUNTRIES[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  const activeBorder = focused ? '#4F46E5' : '#2A2A4A'
  const activeText   = focused ? '#4F46E5' : '#FFFFFF'
  const activeDialColor = focused ? '#4F46E5' : '#9999BB'
  const activeChevronColor = focused ? '#4F46E5' : '#555577'

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.22 } }}
    >
      <StatusBar />

      {/* Page content */}
      <div
        className="absolute flex flex-col"
        style={{ top: 62, left: 0, right: 0, bottom: 0, padding: '20px 24px 40px 24px' }}
      >
        {/* Top row: back button + step label */}
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <motion.button
            onClick={() => navigate('/register')}
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

        {/* Progress bar — 4 segments, first filled */}
        <motion.div
          className="flex"
          style={{ gap: 4, marginBottom: 32 }}
          {...fadeUp(0.05)}
        >
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                flex: 1, height: 3, borderRadius: 99,
                backgroundColor: i === 0 ? '#4F46E5' : '#2A2A4A',
              }}
            />
          ))}
        </motion.div>

        {/* Title + subtitle */}
        <motion.div className="flex flex-col" style={{ gap: 8, marginBottom: 36 }} {...fadeUp(0.1)}>
          <span style={{
            fontFamily: '"Rethink Sans", sans-serif',
            fontSize: 28, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, display: 'block',
          }}>
            Numéro de téléphone
          </span>
          <span style={{
            fontFamily: 'Inter', fontSize: 14, color: '#737373', lineHeight: 1.6, display: 'block',
          }}>
            Un code OTP vous sera envoyé par SMS pour confirmer votre numéro.
          </span>
        </motion.div>

        {/* Phone input */}
        <motion.div style={{ flex: 1 }} {...fadeUp(0.18)}>
          <label style={{
            fontFamily: 'Inter', fontSize: 12, fontWeight: 500,
            color: '#737373', display: 'block', marginBottom: 8,
          }}>
            Numéro de téléphone
          </label>

          {/* Input row — dropdown anchors to this wrapper */}
          <div style={{ position: 'relative' }}>
          <div
            onClick={() => inputRef.current?.focus()}
            style={{
              display: 'flex', alignItems: 'center',
              height: 52, borderRadius: 12,
              backgroundColor: '#141830',
              border: `1.5px solid ${activeBorder}`,
              transition: 'border-color 0.2s ease',
              cursor: 'text',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Country selector button */}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation()
                setDropdownOpen(o => !o)
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '0 10px 0 14px',
                height: '100%', flexShrink: 0,
                background: 'none', border: 'none', cursor: 'pointer',
                borderRight: '1px solid #2A2A4A',
              }}
            >
              <span style={{ fontSize: 20, lineHeight: 1, userSelect: 'none' }}>{country.flag}</span>
              <span style={{
                fontFamily: 'Inter', fontSize: 14, fontWeight: 500,
                color: activeDialColor,
                transition: 'color 0.2s ease',
              }}>
                {country.dial}
              </span>
              <ChevronDown
                size={14} strokeWidth={2.5}
                color={activeChevronColor}
                style={{ transition: 'color 0.2s ease, transform 0.2s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {/* Number input */}
            <input
              ref={inputRef}
              type="tel"
              placeholder="07 00 00 00 00"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                flex: 1, height: '100%',
                background: 'none', border: 'none', outline: 'none',
                padding: '0 16px',
                fontFamily: 'Inter', fontSize: 15, fontWeight: 500,
                color: activeText,
                transition: 'color 0.2s ease',
                caretColor: '#4F46E5',
              }}
            />
          </div>

          {/* Country dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.13 } }}
                style={{
                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                  backgroundColor: '#141830', borderRadius: 12,
                  border: '1px solid #2A2A4A', zIndex: 50,
                  maxHeight: 220, overflowY: 'auto',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                {COUNTRIES.map(c => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCountry(c)
                      setDropdownOpen(false)
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      width: '100%', padding: '11px 16px',
                      background: c.code === country.code ? '#1E2040' : 'transparent',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 20, lineHeight: 1, userSelect: 'none' }}>{c.flag}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#FFFFFF', flex: 1 }}>{c.name}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#555577' }}>{c.dial}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          </div>{/* end input anchor wrapper */}
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={() => navigate('/otp')}
          {...fadeUp(0.28)}
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
