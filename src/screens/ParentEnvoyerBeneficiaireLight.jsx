import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Search, Shield, X } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const RECENTS = [
  { name: 'Rayford Chenail', email: 'Rayford@email.com', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop' },
  { name: 'Krishna Barbe', email: 'Krishna@email.com', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&fit=crop' },
]

const CONTACTS = [
  { name: 'Cyndy Lillibridge', email: 'cyndy@email.com', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&fit=crop' },
  { name: 'Willard Purnell', email: 'willard@email.com', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&fit=crop' },
]

function ContactRow({ name, email, img, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', border: '1px solid #E5E5F0',
      borderRadius: 12, cursor: 'pointer', backgroundColor: '#FFFFFF',
    }}>
      <img src={img} alt={name} style={{ width: 46, height: 46, borderRadius: 23, objectFit: 'cover', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 15, fontWeight: 600, color: '#0A0A0F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </span>
        <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#9494B8' }}>{email}</span>
      </div>
    </div>
  )
}

export default function ParentEnvoyerBeneficiaireLight() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const q = query.toLowerCase()
  const match = c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  const filteredRecents = RECENTS.filter(match)
  const filteredContacts = CONTACTS.filter(match)

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#4F46E5' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <style>{`.pebl-input::placeholder { color: #9494B8; }`}</style>
      <StatusBar color="#FFFFFF" />

      {/* Purple header */}
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0, height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div onClick={() => navigate('/parent-dashboard-light')} style={{
          width: 40, height: 40, borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
          Envoyer de l'argent
        </span>
        <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={18} color="#FFFFFF" strokeWidth={2} />
        </div>
      </div>

      {/* Sheet */}
      <div style={{
        position: 'absolute', top: 124, left: 0, right: 0, bottom: 0,
        backgroundColor: '#F7F8FC', borderRadius: '24px 24px 0 0',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Fixed top */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 6 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#DDDDE8' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 16px' }}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 17, fontWeight: 700, color: '#0A0A0F' }}>
              Choisir le destinataire
            </span>
            <div onClick={() => navigate('/parent-dashboard-light')} style={{
              width: 32, height: 32, borderRadius: 16, backgroundColor: '#0A0A0F',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <X size={15} color="#FFFFFF" strokeWidth={2.5} />
            </div>
          </div>
          <div style={{ padding: '0 20px 14px' }}>
            <div style={{
              height: 46, borderRadius: 14, backgroundColor: '#FFFFFF', border: '1px solid #E5E5F0',
              display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px',
            }}>
              <Search size={16} color="#9494B8" strokeWidth={2} />
              <input
                className="pebl-input"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Chercher un contact"
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: 'Inter', fontSize: 14, color: '#0A0A0F' }}
              />
              {query && <X size={14} color="#9494B8" strokeWidth={2} style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => setQuery('')} />}
            </div>
          </div>
        </div>

        {/* Scrollable list */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 32 }}>
          {filteredRecents.length > 0 && (
            <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 15, fontWeight: 600, color: '#737373' }}>Destinataire récent</span>
              {filteredRecents.map(c => (
                <ContactRow key={c.name} {...c} onClick={() => navigate('/parent-envoyer-montant-light', { state: { recipient: c } })} />
              ))}
            </div>
          )}
          {filteredContacts.length > 0 && (
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 15, fontWeight: 600, color: '#737373' }}>Contact</span>
              {filteredContacts.map(c => (
                <ContactRow key={c.name} {...c} onClick={() => navigate('/parent-envoyer-montant-light', { state: { recipient: c } })} />
              ))}
            </div>
          )}
          {filteredRecents.length === 0 && filteredContacts.length === 0 && query && (
            <div style={{ padding: '32px 20px', textAlign: 'center' }}>
              <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#9494B8' }}>Aucun résultat pour « {query} »</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
