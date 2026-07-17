import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '../components/StatusBar'
import { Eye, EyeOff } from 'lucide-react'
import logo from '../assets/logo_welcome.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] } },
})

const INPUT_LIGHT = {
  height: 52, borderRadius: 12,
  backgroundColor: '#F0F0F8',
  border: '1px solid #D5D5EA',
  padding: '0 16px',
  fontFamily: 'Inter', fontSize: 14, color: '#0D1025',
  outline: 'none', width: '100%',
}

export default function LoginLight() {
  const navigate  = useNavigate()
  const [email,   setEmail]   = useState('')
  const [pwd,     setPwd]     = useState('')
  const [showPwd, setShowPwd] = useState(false)

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#F7F8FC' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {/* Purple radial glow behind logo */}
      <div style={{
        position: 'absolute',
        left: -188, top: -321,
        width: 765, height: 732,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.80) 0%, rgba(79,70,229,0) 70%)',
        pointerEvents: 'none',
      }} />

      <StatusBar color="#0D1025" />

      <div style={{
        position: 'absolute',
        top: 62, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '36px 24px 40px',
      }}>

        {/* ── Top ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>

          {/* Logo */}
          <motion.img
            src={logo}
            alt="Krisma"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
            style={{ width: 169, height: 167, borderRadius: 30, objectFit: 'cover' }}
          />

          {/* Title */}
          <motion.span {...fadeUp(0.1)} style={{
            fontFamily: '"Rethink Sans", sans-serif',
            fontSize: 34, fontWeight: 800, color: '#0D1025',
          }}>
            Connexion
          </motion.span>

          {/* Form */}
          <motion.div {...fadeUp(0.18)} style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#5A5A7A' }}>Email</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="monmail@gmail.com"
                className="placeholder-light"
                style={INPUT_LIGHT}
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#5A5A7A' }}>Mot de passe</span>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                  placeholder="••••••••"
                  className="placeholder-light"
                  style={{ ...INPUT_LIGHT, paddingRight: 48 }}
                />
                <button
                  onClick={() => setShowPwd(v => !v)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPwd
                    ? <EyeOff size={18} color="#AAAABF" />
                    : <Eye    size={18} color="#AAAABF" />
                  }
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom ── */}
        <motion.div {...fadeUp(0.28)} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => navigate('/dashboard-light')}
            style={{
              height: 56, borderRadius: 16,
              backgroundColor: '#4F46E5', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF',
            }}
          >
            Se connecter
          </button>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#888888' }}>
              Mot de passe oublié ?
            </span>
            <span
              onClick={() => navigate('/forgot-password-light')}
              style={{ fontFamily: 'Inter', fontSize: 13, color: '#818CF8', cursor: 'pointer' }}
            >
              Réinitialiser
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
