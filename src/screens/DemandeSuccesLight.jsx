import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import StatusBar from '../components/StatusBar'

function SuccessRings() {
  const pulse = {
    animate: { scale: [1, 1.07, 1] },
    transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
  }

  return (
    <motion.div
      initial={{ scale: 0.75, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ position: 'relative', width: 200, height: 200 }}
    >
      <motion.div
        animate={pulse.animate}
        transition={{ ...pulse.transition, delay: 0 }}
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%', backgroundColor: 'rgba(79,70,229,0.08)',
        }}
      />
      <motion.div
        animate={pulse.animate}
        transition={{ ...pulse.transition, delay: 0.25 }}
        style={{
          position: 'absolute', top: 30, left: 30, right: 30, bottom: 30,
          borderRadius: '50%', backgroundColor: 'rgba(79,70,229,0.15)',
        }}
      />
      <div style={{
        position: 'absolute', top: 65, left: 65,
        width: 70, height: 70, borderRadius: '50%', backgroundColor: '#4F46E5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Check size={28} color="#FFFFFF" strokeWidth={2.5} />
      </div>
    </motion.div>
  )
}

export default function DemandeSuccesLight() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#F7F8FF', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar color="#1A1A2E" />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 20,
        padding: '0 24px',
      }}>
        <SuccessRings />

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            fontFamily: '"Rethink Sans", sans-serif', fontSize: 28,
            fontWeight: 800, color: '#1A1A2E', textAlign: 'center',
          }}
        >
          C'est fait !
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.4 }}
          style={{
            fontFamily: 'Inter', fontSize: 16, color: '#737373',
            textAlign: 'center', lineHeight: 1.5,
          }}
        >
          Votre demande a été soumise{'\n'}avec succès
        </motion.span>
      </div>

      <div style={{ padding: '0 20px 32px' }}>
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          onClick={() => navigate('/dashboard-light')}
          style={{
            width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
            border: 'none', cursor: 'pointer',
            fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
          }}
        >
          Retour
        </motion.button>
      </div>
    </motion.div>
  )
}
