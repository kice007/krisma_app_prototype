import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Shield } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import orangeMoneyLogo from '../assets/orange-money.png'
import mtnLogo from '../assets/mtn-logo.jpg'
import waveLogo from '../assets/wave.png'

const METHODS = [
  { id: 'om',   name: 'Orange Money',      sub: 'Instantané', logo: orangeMoneyLogo },
  { id: 'mtn',  name: 'MTN Mobile Money',  sub: 'Instantané', logo: mtnLogo },
  { id: 'wave', name: 'Wave',              sub: 'Instantané', logo: waveLogo },
]

function fmtAmount(cents) {
  const euros = Math.floor(cents / 100)
  const c = cents % 100
  const eurosStr = euros === 0 ? '00' : euros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${eurosStr}.${c.toString().padStart(2, '0')}`
}

export default function ParentModePaiement() {
  const navigate = useNavigate()
  const location = useLocation()
  const cents = location.state?.cents ?? 30750
  const [active, setActive] = useState('om')

  const selectedMethod = METHODS.find(m => m.id === active)

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#4F46E5' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* Purple header */}
      <div style={{
        position: 'absolute', top: 44, left: 0, right: 0, height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div onClick={() => navigate('/parent-envoyer-montant')} style={{
          width: 40, height: 40, borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
          Confirmer le paiement
        </span>
        <div style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#1A1A3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={17} color="#FFFFFF" strokeWidth={2} />
        </div>
      </div>

      {/* Sheet */}
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0, bottom: 0,
        backgroundColor: '#0A0A0F', borderRadius: '28px 28px 0 0',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '28px 20px 32px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
            Comment souhaitez-vous payer ?
          </p>

          {/* Payment cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {METHODS.map(m => {
              const sel = active === m.id
              return (
                <div
                  key={m.id}
                  onClick={() => setActive(m.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 18px', borderRadius: 14, cursor: 'pointer',
                    border: sel ? '2px solid #4F46E5' : '1px solid #161C2C',
                    backgroundColor: sel ? 'rgba(79,70,229,0.06)' : 'transparent',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <img src={m.logo} style={{ width: 44, height: 44, borderRadius: 22, objectFit: 'cover' }} alt={m.name} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{m.name}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#A0A0C0' }}>{m.sub}</span>
                    </div>
                  </div>
                  {/* Radio */}
                  <div style={{
                    width: 22, height: 22, borderRadius: 11,
                    backgroundColor: sel ? '#4F46E5' : 'transparent',
                    border: sel ? 'none' : '1.5px solid #3A3A5A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {sel && <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' }} />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/parent-envoyer-succes', {
            state: { cents, method: selectedMethod.name, logo: active }
          })}
          style={{
            width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
            border: 'none', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, color: '#FFFFFF',
          }}
        >
          Confirmer · EUR {fmtAmount(cents)}
        </button>
      </div>
    </motion.div>
  )
}
