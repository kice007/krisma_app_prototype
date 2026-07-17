import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Search, X, Shield, Plus } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import logoVisa from '../assets/logo-visa.png'
import logoChaseLight from '../assets/logo-chase-light.png'
import logoMastercard from '../assets/logo-mastercard.png'

const LOGOS = { VISA: logoVisa, CHASE: logoChaseLight, MC: logoMastercard }

const RECENTS = [
  { name: 'Rayford Chenail', mask: '•••• 3261', bank: 'VISA', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop' },
  { name: 'Krishna Barbe', mask: '•••• 4532', bank: 'CHASE', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&fit=crop' },
]

const CONTACTS = [
  { name: 'Cyndy Lillibridge', mask: '•••• 0985', bank: 'MC', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&fit=crop' },
  { name: 'Willard Purnell', mask: '•••• 4532', bank: 'MC', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&fit=crop' },
  { name: 'Amadou Aka', mask: '•••• 3261', bank: 'VISA', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80&fit=crop' },
]

function BankBadge({ bank }) {
  return (
    <div style={{ height: 28, minWidth: 58, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px 8px', flexShrink: 0 }}>
      <img src={LOGOS[bank]} alt={bank} style={{ height: 10, maxWidth: 46, objectFit: 'contain', display: 'block' }} />
    </div>
  )
}

function ContactRow({ name, mask, bank, img, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: '1px solid #DDDDE8', borderRadius: 12, cursor: 'pointer' }}>
      <img src={img} alt={name} style={{ width: 46, height: 46, borderRadius: 23, objectFit: 'cover', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 15, fontWeight: 600, color: '#0A0A0F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
        <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>{mask}</span>
      </div>
      <BankBadge bank={bank} />
    </div>
  )
}

const FIELD_STYLE = {
  width: '100%', height: 52, borderRadius: 12,
  backgroundColor: '#F0F0F8', border: '0.5px solid #E5E5F0',
  padding: '0 16px', boxSizing: 'border-box',
  fontFamily: 'Inter', fontSize: 14, color: '#0A0A0F', outline: 'none',
}

export default function EnvoyerDestinataireLight() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [form, setForm] = useState({ nom: '', prenom: '', mail: '', iban: '' })

  const q = query.toLowerCase()
  const match = c => c.name.toLowerCase().includes(q) || c.mask.includes(q)
  const filteredRecents = RECENTS.filter(match)
  const filteredContacts = CONTACTS.filter(match)
  const noResults = filteredRecents.length === 0 && filteredContacts.length === 0

  function handleSubmit() {
    if (!form.nom || !form.prenom || !form.iban) return
    const ibanClean = form.iban.replace(/\s/g, '')
    const newRecipient = { name: form.prenom + ' ' + form.nom, mask: '•••• ' + ibanClean.slice(-4), img: null }
    setShowForm(false)
    setShowSuccess(true)
    setTimeout(() => navigate('/envoyer-montant-light', { state: { recipient: newRecipient } }), 1000)
  }

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#4F46E5' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <style>{`
        .edl-input::placeholder { color: #9494B8; }
        .edl-form::placeholder { color: #9494B8; }
      `}</style>
      <StatusBar />

      {/* Purple header */}
      <div style={{ position: 'absolute', top: 44, left: 0, right: 0, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <div onClick={() => navigate('/dashboard-light')} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
          Envoyer de l'argent
        </span>
        <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#1A1A3A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Shield size={18} color="#FFFFFF" strokeWidth={2} />
        </div>
      </div>

      {/* Sheet */}
      <div style={{ position: 'absolute', top: 114, left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', borderRadius: '24px 24px 0 0', display: 'flex', flexDirection: 'column' }}>

        {/* ── Fixed top (non-scrolling) ── */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 6 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#D8D8E8' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 16px' }}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 17, fontWeight: 700, color: '#0A0A0F' }}>
              Choisir le destinataire
            </span>
            <div onClick={() => navigate('/dashboard-light')} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#EEEEF5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={15} color="#555577" strokeWidth={2.5} />
            </div>
          </div>

          {/* Search */}
          <div style={{ padding: '0 20px 14px' }}>
            <div style={{ height: 46, borderRadius: 14, backgroundColor: '#F2F2FA', border: '0.5px solid #E0E0F0', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px' }}>
              <Search size={16} color="#9494B8" strokeWidth={2} />
              <input className="edl-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Chercher un contact" style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: 'Inter', fontSize: 14, color: '#0A0A0F' }} />
              {query && <X size={14} color="#9494B8" strokeWidth={2} style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => setQuery('')} />}
            </div>
          </div>

          {/* Add button */}
          <div style={{ padding: '0 20px 16px' }}>
            <button onClick={() => setShowForm(true)} style={{ width: '100%', height: 52, borderRadius: 14, backgroundColor: 'transparent', border: '1.5px dashed #DDDDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer' }}>
              <div style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={14} color="#FFFFFF" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 600, color: '#4F46E5' }}>
                Ajouter un destinataire
              </span>
            </button>
          </div>
        </div>

        {/* ── Scrollable contact list ── */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 32 }}>
          {noResults && (
            <div style={{ padding: '32px 20px', textAlign: 'center' }}>
              <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#9494B8' }}>Aucun résultat pour « {query} »</span>
            </div>
          )}
          {filteredRecents.length > 0 && (
            <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>Destinataire récent</span>
              {filteredRecents.map(c => <ContactRow key={c.name} {...c} onClick={() => navigate('/envoyer-montant-light')} />)}
            </div>
          )}
          {filteredContacts.length > 0 && (
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>Contact</span>
              {filteredContacts.map(c => <ContactRow key={c.name} {...c} onClick={() => navigate('/envoyer-montant-light')} />)}
            </div>
          )}
        </div>
      </div>

      {/* ── Add-recipient form sheet ── */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div key="edl-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setShowForm(false)}
              style={{ position: 'absolute', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div key="edl-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 280 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 51, backgroundColor: '#FFFFFF', borderRadius: '24px 24px 0 0', padding: '12px 20px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#D8D8E8' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 17, fontWeight: 700, color: '#0A0A0F' }}>Nouveau destinataire</span>
                <div onClick={() => setShowForm(false)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#EEEEF5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={15} color="#555577" strokeWidth={2.5} />
                </div>
              </div>
              <input className="edl-form" placeholder="Nom" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} style={FIELD_STYLE} />
              <input className="edl-form" placeholder="Prénom" value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))} style={FIELD_STYLE} />
              <input className="edl-form" placeholder="Adresse e-mail" type="email" value={form.mail} onChange={e => setForm(f => ({ ...f, mail: e.target.value }))} style={FIELD_STYLE} />
              <input className="edl-form" placeholder="IBAN" value={form.iban} onChange={e => setForm(f => ({ ...f, iban: e.target.value }))} style={FIELD_STYLE} />
              <button onClick={handleSubmit} style={{ width: '100%', height: 54, borderRadius: 14, backgroundColor: '#4F46E5', border: 'none', cursor: 'pointer', fontFamily: '"Rethink Sans", sans-serif', fontSize: 15, fontWeight: 700, color: '#FFFFFF', marginTop: 4 }}>
                Ajouter le destinataire
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Success toast ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            key="edl-success-toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', bottom: 40, left: '50%', x: '-50%',
              backgroundColor: '#4F46E5', borderRadius: 12,
              padding: '10px 20px', pointerEvents: 'none', zIndex: 60,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#FFFFFF' }}>
              Destinataire ajouté !
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
