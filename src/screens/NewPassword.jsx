import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, KeyRound, Eye, EyeOff } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function NewPassword() {
  const navigate = useNavigate()
  const [pwd, setPwd] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const isValid = pwd.length >= 8 && confirm.length >= 8
  const mismatch = confirm.length > 0 && pwd !== confirm
  const canSubmit = isValid && !mismatch

  const INPUT = {
    height: 52, borderRadius: 12,
    backgroundColor: '#141830',
    border: '1px solid #2A2A4A',
    padding: '0 48px 0 16px',
    fontFamily: 'Inter', fontSize: 14, color: '#FFFFFF',
    outline: 'none', width: '100%', boxSizing: 'border-box',
    caretColor: '#4F46E5',
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

      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', padding: '20px 24px 40px',
      }}>
        <motion.button
          onClick={() => navigate('/forgot-password-verify')}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 40, height: 40, borderRadius: '50%', backgroundColor: '#141830',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 36, flexShrink: 0,
          }}
        >
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </motion.button>

        <motion.div {...fadeUp(0.05)} style={{
          width: 72, height: 72, borderRadius: '50%',
          backgroundColor: 'rgba(79,70,229,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28, alignSelf: 'center',
        }}>
          <KeyRound size={30} color="#4F46E5" strokeWidth={1.5} />
        </motion.div>

        <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36, textAlign: 'center' }}>
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 28, fontWeight: 800, color: '#FFFFFF' }}>
            Nouveau mot de passe
          </span>
          <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373', lineHeight: 1.6 }}>
            Choisissez un mot de passe sécurisé d'au moins 8 caractères.
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.15)} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#555577', letterSpacing: '0.02em' }}>
              Nouveau mot de passe
            </span>
            <div style={{ position: 'relative' }}>
              <input
                type={showPwd ? 'text' : 'password'}
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                placeholder="••••••••"
                style={INPUT}
              />
              <button
                onClick={() => setShowPwd(v => !v)}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPwd ? <EyeOff size={18} color="#555577" /> : <Eye size={18} color="#555577" />}
              </button>
            </div>
            {pwd.length > 0 && pwd.length < 8 && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ fontFamily: 'Inter', fontSize: 12, color: '#EF4444' }}>
                Minimum 8 caractères
              </motion.span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#555577', letterSpacing: '0.02em' }}>
              Confirmer le mot de passe
            </span>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                style={{
                  ...INPUT,
                  border: `1px solid ${mismatch ? '#EF4444' : '#2A2A4A'}`,
                }}
              />
              <button
                onClick={() => setShowConfirm(v => !v)}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showConfirm ? <EyeOff size={18} color="#555577" /> : <Eye size={18} color="#555577" />}
              </button>
            </div>
            {mismatch && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ fontFamily: 'Inter', fontSize: 12, color: '#EF4444' }}>
                Les mots de passe ne correspondent pas
              </motion.span>
            )}
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <motion.button
            onClick={() => canSubmit && navigate('/password-reset')}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
            {...fadeUp(0.2)}
            style={{
              height: 56, borderRadius: 16,
              backgroundColor: canSubmit ? '#4F46E5' : '#1E2040', border: 'none',
              cursor: canSubmit ? 'pointer' : 'default',
              fontFamily: 'Inter', fontSize: 15, fontWeight: 600,
              color: canSubmit ? '#FFFFFF' : '#3A3A5A',
              width: '100%',
              transition: 'background-color 0.25s ease, color 0.25s ease',
            }}
          >
            Confirmer le mot de passe
          </motion.button>

          <motion.button
            onClick={() => navigate('/login')}
            {...fadeUp(0.25)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, color: '#555577', textAlign: 'center',
            }}
          >
            Retour à la connexion
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
