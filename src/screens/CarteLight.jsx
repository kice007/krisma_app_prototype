import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Eye, Lock, Settings, Copy, Share2, Wifi } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TabBar from '../components/TabBar'
import cardWatermark from '../assets/card.png'
import cardChip from '../assets/card-chip.png'

function VisaLogo({ color = '#090d19' }) {
  return (
    <svg width={75} height={24} viewBox="0 0 265 85" fill={color}>
      <path fillRule="evenodd" d="M170.89999 0c-18.6 0-35.29998 9.7-35.29998 27.5 0 20.5 29.5 21.9 29.5 32.1 0 4.3-5.00002 8.20001-13.40001 8.2-12 0-21-5.4-21-5.4l-3.8 18c0 0 10.3 4.6 24.1 4.6 20.39999 0 36.39999-10.1 36.39999-28.3 0-21.6-29.59999-23-29.59999-32.5 0-3.4 4.10001-7.1 12.5-7.1 9.5 0 17.30001 3.9 17.30001 3.9l3.79998-17.4c-0.1 0-8.6-3.6-20.5-3.6z m-170.39999 1.3l-0.5 2.6c0 0 7.8 1.4 14.9 4.3 9.1 3.3 9.7 5.2 11.3 11.1l16.7 64.3 22.4 0 34.3-82.3-22.3 0-22.1 56-9-47.5c-0.8-5.4-5-8.5-10.2-8.5l-35.5 0z m108.1 0l-17.5 82.3 21.3 0 17.4-82.3-21.2 0z m118.6 0c-5.10001 0-7.80001 2.7-9.80001 7.5l-31.19999 74.8 22.3 0 4.3-12.5 27.2 0 2.60001 12.5 19.69998 0-17.09999-82.3-18 0z m2.90001 22.3l6.59999 30.9-17.7 0 11.10001-30.9z" />
    </svg>
  )
}

const ACTIONS = [
  { Icon: Eye, label: 'Voir Carte' },
  { Icon: Lock, label: 'Bloquer' },
  { Icon: Settings, label: 'Paramètres' },
]

export default function CarteLight() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const handleCopyIban = () => {
    navigator.clipboard.writeText('FR76 1468 9000 0100 4821 3300 075')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#F7F8FC' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar color="#0A0A0F" />

      {/* SubHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div onClick={() => navigate('/dashboard-light')} style={{
          width: 40, height: 40, borderRadius: 50, backgroundColor: '#F0F0F8',
          border: '1px solid #E5E5F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="#0A0A0F" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#0A0A0F' }}>
          Carte
        </span>
        <div style={{ width: 36, height: 36 }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0, bottom: 71,
        display: 'flex', flexDirection: 'column', gap: 24,
        padding: '16px 20px 32px',
        overflowY: 'auto',
      }}>

        {/* Visa Card */}
        <div style={{
          position: 'relative', height: 190, borderRadius: 20, overflow: 'hidden',
          background: 'linear-gradient(135deg, #2A20C0 0%, #4F46E5 100%)',
          flexShrink: 0,
        }}>
          {/* Watermark */}
          <img
            src={cardWatermark} alt=""
            style={{
              position: 'absolute', right: -120, top: -38,
              width: 259, height: 266,
              opacity: 0.5, transform: 'scaleX(1)',
              pointerEvents: 'none',
            }}
          />

          {/* Chip + NFC */}
          <div style={{ position: 'absolute', left: 24, top: 45, display: 'flex', alignItems: 'center', gap: 5 }}>
            <img src={cardChip} alt="" style={{ width: 32, height: 24 }} />
            <div style={{ transform: 'rotate(90deg)', display: 'flex' }}>
              <Wifi size={18} color="rgba(0,0,0,0.67)" strokeWidth={2} />
            </div>
          </div>

          {/* Card number */}
          <span style={{
            position: 'absolute', left: 24, top: 85,
            fontFamily: 'Inter', fontSize: 16, fontWeight: 500, color: '#FFFFFF', letterSpacing: 1,
          }}>
            * * * *   * * * *   * * * *   7865
          </span>

          {/* Bottom row: name/exp + VISA */}
          <div style={{
            position: 'absolute', left: 24, right: 24, top: 127, height: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#FFFFFF' }}>
                Christ Ivan Aka
              </span>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.67)' }}>Exp **/**</span>
                <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.67)' }}>cvv ***</span>
              </div>
            </div>
            <VisaLogo color="#090d19" />
          </div>
        </div>
        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {ACTIONS.map(({ Icon, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div onClick={() => label === 'Paramètres' && navigate('/parametres-carte-light')} style={{
                width: 60, height: 60, borderRadius: 30, backgroundColor: '#4F46E5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <Icon size={22} color="#FFFFFF" strokeWidth={1.5} />
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 500, color: '#737373' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* IBAN Box */}
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 14, padding: '16px 20px',
          border: '0.5px solid #E5E5F0',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: '#737373', letterSpacing: 1 }}>
            IBAN
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#0A0A0F' }}>
              FR76 1468 9000 0100 4821 3300 075
            </span>
            <Copy size={18} color="#4F46E5" strokeWidth={1.5} style={{ flexShrink: 0, marginLeft: 8, cursor: 'pointer' }} onClick={handleCopyIban} />
          </div>
        </div>

        {/* Share RIB */}
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 14, height: 52,
          border: '0.5px solid #E5E5F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer', flexShrink: 0,
        }}>
          <Share2 size={18} color="#0A0A0F" strokeWidth={1.5} />
          <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#0A0A0F' }}>
            Partager mon RIB
          </span>
        </div>

      </div>

      <TabBar activeTab="Ma carte" theme="light" />

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', bottom: 90, left: '50%', x: '-50%',
              backgroundColor: '#4F46E5', borderRadius: 12,
              padding: '10px 20px', pointerEvents: 'none', zIndex: 50,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#FFFFFF' }}>
              IBAN copié !
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
