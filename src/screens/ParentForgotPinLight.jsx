import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Lock, Smartphone } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function ParentForgotPinLight() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('+225 07 07 07 07')

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.22 } }}
    >
      <StatusBar color="#0A0A0F" />

      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', padding: '20px 24px 40px',
      }}>
        <motion.button
          onClick={() => navigate('/parent-connexion-light')}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 40, height: 40, borderRadius: '50%', backgroundColor: '#F4F4F8',
            border: '1px solid #DDDDE8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 36, flexShrink: 0,
          }}
        >
          <ChevronLeft size={20} color="#1A1A2E" strokeWidth={2} />
        </motion.button>

        <motion.div {...fadeUp(0.05)} style={{
          width: 72, height: 72, borderRadius: '50%',
          backgroundColor: 'rgba(79,70,229,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28, alignSelf: 'center',
        }}>
          <Lock size={30} color="#4F46E5" strokeWidth={1.5} />
        </motion.div>

        <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36, textAlign: 'center' }}>
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 28, fontWeight: 800, color: '#1A1A2E' }}>
            Code PIN oublié
          </span>
          <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373', lineHeight: 1.6 }}>
            Pour réinitialiser votre code PIN, nous vous enverrons un code de vérification par SMS.
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.15)} style={{ marginBottom: 'auto' }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373', letterSpacing: '0.02em', display: 'block', marginBottom: 8 }}>
            Numéro enregistré
          </span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            backgroundColor: '#F4F4F8', border: '1px solid #DDDDE8',
            borderRadius: 14, padding: '14px 16px',
          }}>
            <Smartphone size={18} color="#4F46E5" strokeWidth={1.5} style={{ flexShrink: 0 }} />
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                fontFamily: 'Inter', fontSize: 15, fontWeight: 500, color: '#1A1A2E',
                caretColor: '#4F46E5',
              }}
            />
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <motion.button
            onClick={() => navigate('/parent-forgot-pin-verify-light')}
            whileTap={{ scale: 0.98 }}
            {...fadeUp(0.2)}
            style={{
              height: 56, borderRadius: 16, backgroundColor: '#4F46E5', border: 'none',
              cursor: 'pointer', fontFamily: 'Inter', fontSize: 15, fontWeight: 600,
              color: '#FFFFFF', width: '100%',
            }}
          >
            Recevoir le code SMS
          </motion.button>

          <motion.button
            onClick={() => navigate('/parent-connexion-light')}
            {...fadeUp(0.25)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, color: '#737373', textAlign: 'center',
            }}
          >
            Retour à la connexion
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
