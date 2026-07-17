import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Send, Clock } from 'lucide-react'
import StatusBar from '../components/StatusBar'

export default function DemandeLimitLight() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')

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
        <div onClick={() => navigate('/parametres-carte-light')} style={{
          width: 40, height: 40, borderRadius: 50,
          backgroundColor: '#F0F0F8', border: '1px solid #E5E5F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="#0A0A0F" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#0A0A0F' }}>
          Modifier la limite
        </span>
        <div style={{ width: 36, height: 36 }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', top: 118, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', gap: 20,
        padding: '16px 20px 32px',
        overflowY: 'auto',
      }}>

        {/* Current Limit */}
        <div style={{
          backgroundColor: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderRadius: 16, border: '1px solid #E5E5F0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          padding: '18px 20px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Limite actuelle</span>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 22, fontWeight: 700, color: '#0A0A0F' }}>EUR 2,000</span>
          </div>
          <div style={{
            backgroundColor: 'rgba(34,197,94,0.09)', borderRadius: 8, padding: '4px 10px',
          }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#22C55E' }}>Active</span>
          </div>
        </div>

        {/* Input Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#737373' }}>
            Nouvelle limite souhaitée
          </span>
          <div style={{
            backgroundColor: '#FFFFFF',
            display: 'flex', alignItems: 'center', gap: 12,
            height: 56, borderRadius: 12, border: '1px solid #E5E5F0',
            padding: '0 16px',
          }}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#4F46E5', flexShrink: 0 }}>
              EUR
            </span>
            <div style={{ width: 1, height: 20, backgroundColor: '#E5E5F0', flexShrink: 0 }} />
            <input
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Montant souhaité  (ex : 3,000)"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'Inter', fontSize: 15, color: '#0A0A0F',
                caretColor: '#4F46E5',
              }}
            />
          </div>
        </div>

        {/* Reason Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#737373' }}>
              Motif de la demande
            </span>
            <div style={{
              backgroundColor: '#F0F0F8', borderRadius: 6, border: '1px solid #E5E5F0',
              padding: '2px 8px',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#0A0A0F' }}>optionnel</span>
            </div>
          </div>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Ex. : revenus supplémentaires, dépenses planifiées…"
            style={{
              height: 76, borderRadius: 12, border: '1px solid #E5E5F0',
              backgroundColor: '#FFFFFF', outline: 'none', resize: 'none',
              fontFamily: 'Inter', fontSize: 14, color: '#0A0A0F',
              padding: '14px 16px', lineHeight: 1.5,
              caretColor: '#4F46E5',
            }}
          />
        </div>

        {/* Info Note */}
        <div style={{
          backgroundColor: '#eef2ff', borderRadius: 14,
          border: '1px solid rgba(199,210,254,0.29)',
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 50, backgroundColor: '#4F46E5',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Clock size={16} color="#FFFFFF" strokeWidth={1.5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#0A0A0F' }}>
              Délai d'examen : 24–48h ouvrées
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373', lineHeight: 1.5 }}>
              Vous serez notifié(e) par e-mail et SMS.
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Submit Button */}
        <div style={{
          height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer', flexShrink: 0,
        }} onClick={() => navigate('/limite-soumise-light')}>
          <Send size={18} color="#FFFFFF" strokeWidth={1.5} />
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
            Soumettre la demande
          </span>
        </div>

      </div>
    </motion.div>
  )
}
