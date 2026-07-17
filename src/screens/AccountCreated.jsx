import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const ACCOUNT_NUMBER = 'KR · 0123456789'
const ACCOUNT_NAME   = 'IVAN EHOUMAN'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function AccountCreated() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* ── Content: space-between column ── */}
      <div style={{
        position: 'absolute',
        top: 62, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 24px 40px',
      }}>

        {/* ── Top section ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>

          {/* Success rings */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.55, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] } }}
            style={{ position: 'relative', width: 200, height: 200, flexShrink: 0 }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              backgroundColor: 'rgba(79,70,229,0.08)',
            }} />
            <div style={{
              position: 'absolute', top: 30, left: 30,
              width: 140, height: 140,
              borderRadius: '50%',
              backgroundColor: 'rgba(79,70,229,0.15)',
            }} />
            <div style={{
              position: 'absolute', top: 65, left: 65,
              width: 70, height: 70,
              borderRadius: '50%',
              backgroundColor: '#4F46E5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.span {...fadeUp(0.2)} style={{
            fontFamily: '"Rethink Sans", sans-serif',
            fontSize: 32, fontWeight: 800, color: '#FFFFFF',
            textAlign: 'center',
          }}>
            Tout est prêt !
          </motion.span>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.28)} style={{
            fontFamily: 'Inter', fontSize: 14, fontWeight: 400,
            color: '#FFFFFF', textAlign: 'center', lineHeight: 1.6,
            margin: 0,
          }}>
            Vous avez créé votre compte Krisma avec succès. Il ne vous reste plus qu'à commencer à l'utiliser.
          </motion.p>

          {/* Account card */}
          <motion.div {...fadeUp(0.36)} style={{
            width: '100%',
            backgroundColor: '#0D1025',
            borderRadius: 16,
            border: '1px solid #1E1E2E',
            padding: '20px 24px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 13,
          }}>
            <span style={{
              fontFamily: 'Inter', fontSize: 12, fontWeight: 400,
              color: '#737373', textAlign: 'center',
            }}>
              Votre nouveau numéro de compte
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontFamily: '"Rethink Sans", sans-serif',
                fontSize: 20, fontWeight: 700, color: '#FFFFFF',
              }}>
                {ACCOUNT_NUMBER}
              </span>
              <button
                onClick={handleCopy}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
              >
                {copied
                  ? <Check size={18} color="#818CF8" strokeWidth={2.5} />
                  : <Copy size={18} color="#818CF8" strokeWidth={2} />
                }
              </button>
            </div>

            <span style={{
              fontFamily: 'Inter', fontSize: 13, fontWeight: 400,
              color: '#FFFFFF', textAlign: 'center',
            }}>
              {ACCOUNT_NAME}
            </span>
          </motion.div>
        </div>

        {/* ── Buttons ── */}
        <motion.div {...fadeUp(0.44)} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              height: 56, borderRadius: 16,
              backgroundColor: '#4F46E5', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF',
            }}
          >
            Accéder à mon compte
          </button>

          <button
            onClick={() => navigate('/login')}
            style={{
              height: 56, borderRadius: 16,
              backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 15, fontWeight: 500, color: '#737373',
            }}
          >
            Je le ferai plus tard
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
