import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Send, Clock } from 'lucide-react'
import StatusBar from '../components/StatusBar'

export default function DemandeLimit() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* SubHeader */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div onClick={() => navigate('/parametres-carte')} style={{
          width: 40, height: 40, borderRadius: 50, backgroundColor: '#141830',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
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
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderRadius: 16, border: '1px solid #1E1E2E',
          boxShadow: '0 4px 20px rgba(0,0,0,0.33)',
          padding: '18px 20px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#8080A0' }}>Limite actuelle</span>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 22, fontWeight: 700, color: '#FFFFFF' }}>EUR 2,000</span>
          </div>
          <div style={{
            backgroundColor: 'rgba(34,197,94,0.13)', borderRadius: 8, padding: '4px 10px',
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
            display: 'flex', alignItems: 'center', gap: 12,
            height: 56, borderRadius: 12, border: '1px solid #161c2c',
            padding: '0 16px',
            boxShadow: '0 1px 4px rgba(255,255,255,0.03) inset',
          }}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#4F46E5', flexShrink: 0 }}>
              EUR
            </span>
            <div style={{ width: 1, height: 20, backgroundColor: '#2A2A4A', flexShrink: 0 }} />
            <input
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Montant souhaité  (ex : 3,000)"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'Inter', fontSize: 15, color: '#8080A0',
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
              backgroundColor: '#141830', borderRadius: 6, border: '1px solid #2A2A4A',
              padding: '1px 8px',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#555577' }}>optionnel</span>
            </div>
          </div>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Ex. : revenus supplémentaires, dépenses planifiées…"
            style={{
              height: 76, borderRadius: 12, border: '1px solid #161c2c',
              background: 'transparent', outline: 'none', resize: 'none',
              fontFamily: 'Inter', fontSize: 14, color: '#FFFFFF',
              padding: '14px 16px', lineHeight: 1.5,
              caretColor: '#4F46E5',
              boxShadow: '0 1px 4px rgba(255,255,255,0.03) inset',
            }}
          />
        </div>

        {/* Info Note */}
        <div style={{
          backgroundColor: '#0D1025', borderRadius: 14,
          border: '1px solid #2A2A4A',
          boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
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
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#FFFFFF' }}>
              Délai d'examen : 24–48h ouvrées
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#8888A0', lineHeight: 1.5 }}>
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
        }} onClick={() => navigate('/limite-soumise')}>
          <Send size={18} color="#FFFFFF" strokeWidth={1.5} />
          <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
            Soumettre la demande
          </span>
        </div>

      </div>
    </motion.div>
  )
}
