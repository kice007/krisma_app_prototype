import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Calendar, Lock } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

function InputField({ label, placeholder, value, onChange, type = 'text', icon: Icon }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col" style={{ gap: 8 }}>
      <label style={{
        fontFamily: 'Inter', fontSize: 13, fontWeight: 400,
        color: focused ? '#818CF8' : '#FFFFFF',
        transition: 'color 0.2s ease',
      }}>
        {label}
      </label>

      <div style={{
        display: 'flex', alignItems: 'center',
        height: 52, borderRadius: 12,
        backgroundColor: '#141830',
        border: `1px solid ${focused ? '#4F46E5' : '#2A2A4A'}`,
        transition: 'border-color 0.2s ease',
        padding: '0 16px',
        gap: 10,
      }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontFamily: 'Inter', fontSize: 14, fontWeight: 400,
            color: focused ? '#4F46E5' : '#FFFFFF',
            caretColor: '#4F46E5',
            transition: 'color 0.2s ease',
          }}
        />
        {Icon && (
          <Icon size={17} strokeWidth={1.8}
            color={focused ? '#4F46E5' : '#555577'}
            style={{ flexShrink: 0, transition: 'color 0.2s ease' }}
          />
        )}
      </div>
    </div>
  )
}

function PrivNote() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      backgroundColor: '#141830',
      border: '0.5px solid #2A2A4A',
      borderRadius: 10,
      padding: '10px 14px',
    }}>
      <Lock size={16} color="#818CF8" strokeWidth={1.5} style={{ flexShrink: 0 }} />
      <span style={{
        fontFamily: 'Inter', fontSize: 12, fontWeight: 400,
        color: '#9494B8', lineHeight: 1.4,
      }}>
        Données chiffrées et protégées · Conforme RGPD
      </span>
    </div>
  )
}

export default function ParentInfo() {
  const navigate = useNavigate()
  const [prenom, setPrenom] = useState('')
  const [nom,    setNom]    = useState('')
  const [dob,    setDob]    = useState('')

  const allFilled = prenom.trim() && nom.trim() && dob.trim()

  const handleDob = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    let f = digits
    if (digits.length > 2) f = digits.slice(0, 2) + '/' + digits.slice(2)
    if (digits.length > 4) f = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4)
    setDob(f)
  }

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
        style={{ top: 62, left: 0, right: 0, bottom: 0, padding: '20px 24px 40px 24px' }}
      >
        {/* Back + step label */}
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <motion.button
            onClick={() => navigate('/parent-otp')}
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
            ÉTAPE 2 SUR 4
          </span>
        </div>

        {/* Progress bar — 2 of 4 filled */}
        <motion.div className="flex" style={{ gap: 4, marginBottom: 20 }} {...fadeUp(0.05)}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 99,
              backgroundColor: i < 2 ? '#4F46E5' : '#2A2A4A',
            }} />
          ))}
        </motion.div>

        {/* Title */}
        <motion.div style={{ marginBottom: 20 }} {...fadeUp(0.1)}>
          <span style={{
            fontFamily: '"Rethink Sans", sans-serif',
            fontSize: 30, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, display: 'block',
          }}>
            Informations personnelles
          </span>
        </motion.div>

        {/* Form */}
        <motion.div className="flex flex-col" style={{ gap: 16, flex: 1 }} {...fadeUp(0.18)}>
          <InputField
            label="Prénom légal"
            placeholder="Entrez votre prénom"
            value={prenom}
            onChange={setPrenom}
          />
          <InputField
            label="Nom de famille"
            placeholder="Entrez votre nom"
            value={nom}
            onChange={setNom}
          />
          <InputField
            label="Date de naissance"
            placeholder="JJ/MM/AAAA"
            value={dob}
            onChange={handleDob}
            type="tel"
            icon={Calendar}
          />
          <PrivNote />
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={() => { if (allFilled) navigate('/parent-id-doc') }}
          {...fadeUp(0.3)}
          whileTap={allFilled ? { scale: 0.98 } : {}}
          style={{
            backgroundColor: allFilled ? '#4F46E5' : '#1E2040',
            height: 56, borderRadius: 16,
            border: 'none', cursor: allFilled ? 'pointer' : 'default',
            fontFamily: 'Inter', fontSize: 15, fontWeight: 600,
            color: allFilled ? '#FFFFFF' : '#3A3A5A',
            width: '100%', marginTop: 24,
            transition: 'background-color 0.25s ease, color 0.25s ease',
          }}
        >
          Continuer
        </motion.button>
      </div>
    </motion.div>
  )
}
