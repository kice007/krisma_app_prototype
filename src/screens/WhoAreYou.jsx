import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CallIcon, TeacherIcon } from '../components/Icons'
import StatusBar from '../components/StatusBar'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] } },
})

const options = [
  {
    id: 'parent',
    Icon: CallIcon,
    title: "Je suis un parent d'étudiants",
    subtitle: "J'envoie de l'argent à mon enfant à l'étranger",
  },
  {
    id: 'student',
    Icon: TeacherIcon,
    title: 'Je suis un étudiant',
    subtitle: "J'étudie en Europe, je gère mes finances",
  },
]

export default function WhoAreYou() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('student')

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* Content */}
      <div
        className="absolute flex flex-col justify-between"
        style={{ top: 62, left: 0, right: 0, bottom: 0, padding: '36px 24px 40px 24px' }}
      >
        {/* Top */}
        <div className="flex flex-col" style={{ gap: 28 }}>

          <motion.div className="flex flex-col" style={{ gap: 10 }} {...fadeUp(0.05)}>
            <span style={{
              fontFamily: '"Rethink Sans", sans-serif',
              fontSize: 34, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, display: 'block',
            }}>
              Qui êtes-vous ?
            </span>
            <span style={{
              fontFamily: 'Inter', fontSize: 14, color: '#e5e5e5', lineHeight: 1.6, display: 'block',
            }}>
              Pour ouvrir un compte, nous aurons besoin d'informations vous concernant. Préparez vos documents.
            </span>
          </motion.div>

          {/* Option cards — same height via minHeight on both */}
          <div className="flex flex-col" style={{ gap: 12 }}>
            {options.map(({ id, Icon, title, subtitle }, i) => {
              const isSelected = selected === id
              return (
                <motion.button
                  key={id}
                  onClick={() => setSelected(id)}
                  {...fadeUp(0.15 + i * 0.1)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: 16, borderRadius: 14, width: '100%', minHeight: 88,
                    textAlign: 'left', cursor: 'pointer', border: 'none',
                    backgroundColor: isSelected ? '#4F46E51A' : 'transparent',
                    boxShadow: isSelected ? 'inset 0 0 0 1px #4F46E5' : 'inset 0 0 0 1px #2A2A4A',
                    transition: 'background-color 0.2s, box-shadow 0.2s',
                  }}
                >
                  {/* Icon — no background */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={24} color={isSelected ? '#4F46E5' : '#FFFFFF'} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col" style={{ gap: 4, flex: 1 }}>
                    <span style={{
                      fontFamily: '"Rethink Sans", sans-serif',
                      fontSize: 15, fontWeight: 700, color: '#FFFFFF',
                    }}>
                      {title}
                    </span>
                    <span style={{
                      fontFamily: 'Inter', fontSize: 12, color: '#737373', lineHeight: 1.5,
                    }}>
                      {subtitle}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => navigate('/register', { state: { role: selected } })}
          {...fadeUp(0.38)}
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
