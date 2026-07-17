import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import StatusBar from '../components/StatusBar'

function SuccessRings() {
  return (
    <div style={{ position: 'relative', width: 180, height: 180, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#E8E7FF' }} />
      <div style={{ position: 'absolute', inset: 22, borderRadius: '50%', backgroundColor: '#C7C5F8' }} />
      <div style={{
        position: 'absolute', inset: 55, borderRadius: '50%', backgroundColor: '#4F46E5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Check size={32} color="#FFFFFF" strokeWidth={2.5} />
      </div>
    </div>
  )
}

export default function PasswordResetLight() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#F7F8FC' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar color="#0D1025" />

      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 28px',
      }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
          style={{ marginBottom: 40 }}
        >
          <SuccessRings />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.18 } }}
          style={{
            fontFamily: '"Rethink Sans", sans-serif', fontSize: 30, fontWeight: 800,
            color: '#1A1A2E', textAlign: 'center', marginBottom: 14, display: 'block', lineHeight: 1.2,
          }}
        >
          Mot de passe réinitialisé !
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.26 } }}
          style={{
            fontFamily: 'Inter', fontSize: 14, color: '#737373',
            lineHeight: 1.6, textAlign: 'center', marginBottom: 20, display: 'block',
          }}
        >
          Votre nouveau mot de passe est actif. Vous pouvez maintenant vous connecter en toute sécurité.
        </motion.span>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.32 } }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0',
            borderRadius: 20, padding: '6px 14px', marginBottom: 'auto',
          }}
        >
          <Check size={14} color="#16A34A" strokeWidth={2.5} />
          <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#16A34A' }}>
            Nouveau mot de passe enregistré
          </span>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <motion.button
            onClick={() => navigate('/login-light')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.38 } }}
            whileTap={{ scale: 0.98 }}
            style={{
              height: 56, borderRadius: 16, backgroundColor: '#4F46E5', border: 'none',
              cursor: 'pointer', fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF',
            }}
          >
            Se connecter
          </motion.button>

          <motion.button
            onClick={() => navigate('/login-light')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.46 } }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, color: '#737373', textAlign: 'center',
            }}
          >
            Retour à l'accueil
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
