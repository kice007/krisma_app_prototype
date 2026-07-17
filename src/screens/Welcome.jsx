import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo_welcome.png'
import StatusBar from '../components/StatusBar'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      {/* Indigo glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 765,
          height: 732,
          left: -177,
          top: -325,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, #4f46e5cc 0%, #4F46E500 100%)',
          filter: 'blur(50px)',
        }}
      />

      <StatusBar />

      {/* Content — vertical layout, space between top block and buttons */}
      <div
        className="absolute flex flex-col justify-between"
        style={{ top: 99, left: 0, right: 0, bottom: 0, padding: '36px 24px 40px 24px' }}
      >
        {/* Top: logo + heading + tagline */}
        <div className="flex flex-col items-center" style={{ gap: 28 }}>
          <motion.div
            style={{ width: 169, height: 167, borderRadius: 30, overflow: 'hidden' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }}
          >
            <img src={logo} alt="Krisma" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          {/* Heading */}
          <motion.div className="flex flex-col items-center" style={{ gap: 2 }} {...fadeUp(0.25)}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 34, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15 }}>
              Bienvenu sur
            </span>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 34, fontWeight: 800, color: '#4f46e5', lineHeight: 1.15 }}>
              Krisma
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            style={{
              fontFamily: 'Inter', fontSize: 14, color: '#e1e1e3',
              lineHeight: 1.6, textAlign: 'center', width: '100%',
            }}
            {...fadeUp(0.38)}
          >
            L'Afrique envoie, le monde reçoit. Envoyez de l'argent à vos proches à l'international depuis l'Afrique.
          </motion.p>
        </div>

        {/* Bottom: buttons + terms */}
        <motion.div className="flex flex-col" style={{ gap: 12 }} {...fadeUp(0.5)}>
          <button
            onClick={() => navigate('/who')}
            style={{
              backgroundColor: '#4F46E5',
              height: 56,
              borderRadius: 16,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontSize: 15,
              fontWeight: 600,
              color: '#FFFFFF',
              width: '100%',
            }}
          >
            Créer mon compte
          </button>

          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: 'transparent',
              height: 56,
              borderRadius: 16,
              border: '1px solid #3A3A5A',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontSize: 15,
              fontWeight: 500,
              color: '#9999BB',
              width: '100%',
            }}
          >
            J'ai déjà un compte
          </button>

          <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#737373', textAlign: 'center', lineHeight: 1.5 }}>
            En créant un compte, vous acceptez nos CGU et notre Politique de confidentialité.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
