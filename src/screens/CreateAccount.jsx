import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CallIcon, UserIcon, DocumentIcon, CameraIcon } from '../components/Icons'
import StatusBar from '../components/StatusBar'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] } },
})

const steps = [
  {
    Icon: CallIcon,
    title: 'Numéro de téléphone',
    subtitle: 'Un code OTP vous sera envoyé par SMS',
  },
  {
    Icon: UserIcon,
    title: 'Informations personnelles',
    subtitle: 'Prénom, nom, date de naissance',
  },
  {
    Icon: DocumentIcon,
    title: "Document d'identité",
    subtitle: 'Passeport ou carte de séjour',
  },
  {
    Icon: CameraIcon,
    title: 'Selfie de vérification',
    subtitle: '10 secondes pour confirmer votre identité',
  },
]

export default function CreateAccount() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.22 } }}
    >
      <StatusBar />

      {/* Content */}
      <div
        className="absolute flex flex-col justify-between"
        style={{ top: 62, left: 0, right: 0, bottom: 0, padding: '36px 24px 40px 24px' }}
      >
        {/* Top */}
        <div className="flex flex-col" style={{ gap: 24 }}>

          {/* Title + subtitle */}
          <motion.div className="flex flex-col" style={{ gap: 12 }} {...fadeUp(0.05)}>
            <span style={{
              fontFamily: '"Rethink Sans", sans-serif',
              fontSize: 40, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, display: 'block',
            }}>
              Créer votre compte
            </span>
            <span style={{
              fontFamily: 'Inter', fontSize: 14, color: '#FFFFFF', lineHeight: 1.6, display: 'block',
            }}>
              Pour ouvrir un compte étudiant, nous aurons besoin de ces informations. Préparez-les.
            </span>
          </motion.div>

          {/* Steps */}
          <div className="flex flex-col" style={{ gap: 16 }}>
            {steps.map(({ Icon, title, subtitle }, i) => (
              <motion.div
                key={title}
                className="flex items-center"
                style={{ gap: 16 }}
                {...fadeUp(0.15 + i * 0.08)}
              >
                {/* Icon box */}
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  backgroundColor: '#141830',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={22} color="#818cf8" />
                </div>

                {/* Text */}
                <div className="flex flex-col" style={{ gap: 3 }}>
                  <span style={{
                    fontFamily: '"Rethink Sans", sans-serif',
                    fontSize: 14, fontWeight: 700, color: '#FFFFFF',
                  }}>
                    {title}
                  </span>
                  <span style={{
                    fontFamily: 'Inter', fontSize: 12, color: '#737373', lineHeight: 1.5,
                  }}>
                    {subtitle}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => navigate('/phone')}
          {...fadeUp(0.52)}
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
